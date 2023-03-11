import Stripe from 'stripe';
import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/internal';
import { PUBLIC_APP_DOMAIN } from '$env/static/public';
import { STRIPE_SECRET_KEY } from '$env/static/private';

import { APP_PRODUCT, STRIPE_PAYMENT_MODE } from '$lib/shared/shared.type';

import { PRODUCT_PRICE_ID_MAPPINGS } from './checkout.constant';

/**
 * https://stripe.com/docs/checkout/quickstart
 * https://stripe.com/docs/payments/checkout/how-checkout-works
 *
 * "A Checkout Session controls what your customer sees in the Stripe-hosted payment page
 * such as line items, the order amount and currency, and acceptable payment methods"
 *
 * A Checkout Session represents your customer's session as they pay for
 * one-time purchases or subscriptions through Checkout.
 *
 * Test cards:
 *
 * 4242 4242 4242 4242 (payment succeeds)
 * 4000 0025 0000 3155 (Payment requires auth.)
 * 4000 0000 0000 9995 (Payment is declined)
 */
export const POST = async (event: RequestEvent) => {
  // const requestBody = await event.request.json();
  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
  });

  const user = event.locals.user;
  const userId = user?.id;

  /**
   * Parse
   */
  // const { appProduct } = requestBody;

  /**
   * Verify
   */
  if (!userId) {
    throw error(400, 'Invalid request');
  }

  /**
   * Request config.
   */
  const priceId = PRODUCT_PRICE_ID_MAPPINGS[APP_PRODUCT.BESTIES_FOREVER];
  const stripePaymentMode = STRIPE_PAYMENT_MODE.PAYMENT;

  if (!priceId) {
    throw error(400, 'Invalid product');
  }

  /**
   * Checkout session
   *
   * https://stripe.com/docs/api/checkout/sessions/create
   */
  const checkoutSession = await stripe.checkout.sessions
    .create({
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      client_reference_id: userId,
      mode: stripePaymentMode,
      success_url: `http://${PUBLIC_APP_DOMAIN}/plans`,
      cancel_url: `http://${PUBLIC_APP_DOMAIN}/plans`
    })
    .catch((error) => {
      throw error(400, 'Checkout session creation error');
    });

  return json({
    checkoutUrl: checkoutSession.url
  });
};
