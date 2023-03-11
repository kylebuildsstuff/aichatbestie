import Stripe from 'stripe';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/internal';
import {
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  NHOST_JWT_SECRET
} from '$env/static/private';

import { nhost } from '$lib/core/nhost/nhost';
import { hasuraGraphqlRequest } from '$lib/shared/shared-utils';

import { createJwt, createJwtClaims } from '$lib/modules/jwt/jwt-utils';
import { HASURA_ROLE } from '$lib/shared/shared.type';

/**
 * Handles stripe events of the completed checkout session type
 *
 * https://stripe.com/docs/payments/checkout/fulfill-orders
 * https://stripe.com/docs/api/checkout/sessions
 * https://stripe.com/docs/payments/checkout/how-checkout-works
 * https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=checkout#create-session
 *
 * https://github.com/sveltejs/kit/pull/3384
 *
 * - Verify stripe request
 * - Parse checkout.session.completed event
 * - Retrieve expanded checkout session items (line_items, customer, product)
 * - Cancel existing active subscription, if applicable
 *   - Fetch activeSubscriptionId from userSettings
 * - Save stripe event
 *   - Save event
 *   - Update user settings (characters, monthlyCharacterLimit, appSubscriptionType, activeSubscriptionId)
 */
export const POST = async (event: RequestEvent<Record<string, string>>) => {
  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
  });
  const stripeSignature = event?.request?.headers?.get?.('stripe-signature') || '';
  const rawBody = await event.request.text();

  let stripeEvent;

  /**
   * Verify request
   */
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      stripeSignature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (e) {
    throw error(400, 'Invalid request');
  }

  /**
   * Save checkout, update user
   *
   * checkout.session.completed applies for prepaid and subscription
   *
   * Subscription should also handle invoice.paid and invoice.payment_failed, but not yet implemented
   * @TODO
   * - Create receipt for completed checkout
   * - Success/fail pages
   * - invoice failed customer portal and user update?
   * - invoice paid update customer if previously failed?
   */
  if (stripeEvent.type === 'checkout.session.completed') {
    // https://stripe.com/docs/api/checkout/sessions/object
    const checkoutSession = stripeEvent?.data?.object as Stripe.Checkout.Session;
    const session = await stripe.checkout.sessions.retrieve(checkoutSession.id, {
      expand: ['line_items', 'customer']
    });
    // https://stackoverflow.com/questions/71352151/how-to-access-items-metadata-in-stripe-checkout-session
    const lineItems = (await stripe.checkout.sessions.listLineItems(
      checkoutSession.id,
      {
        expand: ['data.price.product']
      }
    )) as any;
    const userId = session?.client_reference_id;
    // Yes, this does copy nested attributes, objects, and arrays just fine...
    const completeSession = { ...session, line_items: lineItems };
    // Values are all strings.
    // Stripe is source b/c parsing and using app as source would be pain in ass.
    // const productMetadata = lineItems?.data?.[0]?.price?.product?.metadata;

    // const isPrepaid = !!productMetadata?.is_prepaid;
    // const characters = Number(productMetadata?.characters) || 0;
    // const appSubscriptionType = productMetadata?.app_subscription_type;
    // const subscriptionId = isPrepaid ? null : completeSession.subscription;

    /**
     * Differentiates between prepaid and subscription, not monthly and yearly.
     * What matters most is characters and isRecurring or not, and if so, then appSubscriptionType.
     *
     * Feels a bit janky but it works for now, for as long as stripe products are source of truth.
     *
     * I think the awkwardness comes from requiring priceId when creating checkout sessions, but what
     * we really want is to be based off productId, and then integrating with our app, which introduces
     * appSubscriptionType, monthly/yearly, and isPrepaid.
     */
    // const isValidProduct =
    //   !!characters && (isPrepaid || (appSubscriptionType && subscriptionId));

    if (!userId) {
      throw error(400, 'Invalid event');
    }

    const hasuraJwt = createJwt(
      createJwtClaims(userId, HASURA_ROLE.HASURA),
      NHOST_JWT_SECRET
    );
    const graphqlEndpoint = nhost.graphql.httpUrl;

    /**
     * Save stripe event, update UserSettings
     */
    const hasuraVariables = {
      ...stripeEvent,
      ...{ data: { object: completeSession } },
      ...{ userId: userId },
      ...{ isUpgraded: true }
    };

    // Keeping this raw and full for transparency
    await hasuraGraphqlRequest(
      `
      mutation SaveStripeEvent (
        $id: String,
        $object: String,
        $api_version: String,
        $created: bigint,
        $livemode: Boolean,
        $pending_webhooks: Int,
        $request: jsonb,
        $type: String,
        $data: jsonb,
        $userId: uuid!,
        $isUpgraded: Boolean!
      ) {
        insertStripeEventOne(
          object: {
            id: $id,
            object: $object,
            apiVersion: $api_version,
            created: $created,
            livemode: $livemode,
            pendingWebhooks: $pending_webhooks,
            request: $request,
            type: $type,
            data: $data,
            userId: $userId
          },
          on_conflict: {
            constraint: stripe_event_pkey,
            update_columns: []
          }
        ) {
          id
          object
          apiVersion
          created
          livemode
          pendingWebhooks
          request
          type
          data
          userId
        }

        updateUserSettingsByPk(
          pk_columns: {userId: $userId},
          _set: { isUpgraded: $isUpgraded }

        ) {
          userId
        }
      }
    `,
      hasuraVariables,
      graphqlEndpoint,
      hasuraJwt
    ).catch(() => {
      throw error(400, 'Error saving stripe event');
    });
  }

  return new Response('{}', { status: 200 });
};
