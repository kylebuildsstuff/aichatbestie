import jwt from 'jsonwebtoken';
import type { Handle } from '@sveltejs/kit';
import { NHOST_JWT_SECRET, NHOST_WEBHOOK_SECRET } from '$env/static/private';

import { createJwt, createJwtClaims } from '$lib/modules/jwt/jwt-utils';
import { HASURA_ROLE } from '$lib/shared/shared.type';
import { nhost } from '$lib/core/nhost/nhost';
import { hasuraGraphqlRequest } from '$lib/shared/shared-utils';
import { userDataQuery } from '$lib/shared/shared.graphql';

export const handle: Handle = async ({ event, resolve }) => {
  /**
   * CORS
   */
  const requestMethod = event.request?.method?.toUpperCase?.() || '';

  if (requestMethod === 'OPTIONS') {
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
    return new Response('{}', {
      status: 204,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
      }
    });
  }

  const isHealthCheck = event.url.pathname.startsWith('/health-check');
  const isApiRequest = event.url.pathname.startsWith('/api');
  const isHasuraWebhookRequest =
    event.url.pathname.startsWith('/webhooks') &&
    // completed-checkout has stripe-specific auth
    !event.url.pathname.startsWith('/webhooks/completed-checkout');

  /**
   * Health check
   */
  if (isHealthCheck) {
    return new Response('{}', { status: 200 });
  }

  /**
   * Webhook authentication (hasura-only webhooks)
   */
  if (isHasuraWebhookRequest) {
    const hasuraAuthorization =
      event.request?.headers?.get?.('hasura-authorization') || '';

    if (hasuraAuthorization === NHOST_WEBHOOK_SECRET) {
      const hasuraJwt = createJwt(
        createJwtClaims('hasura-cron-trigger', HASURA_ROLE.HASURA),
        NHOST_JWT_SECRET
      );

      event.locals.hasuraJwt = hasuraJwt;
    }
  }

  /**
   * Api authentication
   */
  if (isApiRequest) {
    // Parse header for session token
    let sessionToken = event.request?.headers?.get?.('authorization') as any;

    sessionToken = sessionToken?.startsWith?.('Bearer ')
      ? sessionToken?.split?.(' ')
      : '';
    if (Array.isArray(sessionToken) && sessionToken.length === 2) {
      sessionToken = sessionToken[1];
    } else {
      throw new Error('Invalid api request');
    }

    // Decode session token
    let decodedToken: any;

    try {
      decodedToken = jwt.verify(sessionToken, NHOST_JWT_SECRET || '', {
        ignoreNotBefore: true
      });
    } catch (error) {
      throw new Error('Invalid api request');
    }

    const userId =
      decodedToken?.['https://hasura.io/jwt/claims']?.['x-hasura-user-id'] || '';

    if (!userId) {
      throw new Error('Invalid api request');
    }

    // Fetch user
    const hasuraJwt = createJwt(
      createJwtClaims(userId, HASURA_ROLE.USER),
      NHOST_JWT_SECRET
    );
    const graphqlEndpoint = nhost.graphql.httpUrl;

    // event.locals persists to API endpoints like +server.ts while loaders do not
    event.locals = await hasuraGraphqlRequest(
      userDataQuery,
      { userId },
      graphqlEndpoint,
      hasuraJwt
    ).then((response: any) => {
      return {
        user: response.data.user,
        hasuraJwt
      };
    });
  }

  const response = await resolve(event);

  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Headers', '*');
  response.headers.set('Access-Control-Allow-Methods', '*');

  return response;
};
