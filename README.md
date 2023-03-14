# AI Chat Bestie

AI Chat Bestie is an unofficial ChatGPT app.

By connecting directly to the API it can provide faster responses, a more customizable UI, and many more features and integrations.

Hosted version available at https://aichatbestie.com.

## Features

- Faster response times
- Searchable chat history
- Customizable system message
- Prompt library
- Regenerate messages
- Bring your own key

## Self-hosting

The app uses `sveltekit` and can run directly in the terminal with `npm run dev`. `nhost` is only needed for account-related features and the app will run just fine without it.

## Terminals

1. Sveltekit - `npm run dev`
2. nhost - `nhost dev`
3. stripe - `stripe listen --forward-to http://localhost:3000/webhooks/completed-checkout`

## Development scripts

- `npm run dev` runs sveltekit server
- `nhost dev` runs nhost

- `npm run check` syncs `.env` variables

-- Stripe checkout --

`stripe login`
`stripe listen --forward-to http://localhost:3000/webhooks/completed-checkout`
`stripe trigger checkout.session.completed`

-- ngrok (hasura webhooks) --

`npx ngrok http --subdomain=ktruong008 3000`

-- email --

Supplied by Mailhog, usually at `localhost:8025`

## Production branches

- `nhost-production` - `nhost`/`hasura`/migrations/metadata

## Deployment checklist

- Update environment variables (netlify)
- Deploy `nhost` branch (if needed)
- Push production branch `netlify-production`

## nhost quirks/undocumented

- nhost client seems to keep track of authenticated state of users in some session
- nhost client automatically does stuff with auth/refresh tokens using the admin role
- nhost client automatically attaches `user_vars` to client graphql requests:
- `http://localhost:1337/v1/functions/time` (example for accessing nhost functions)
- use `isAuthenticatedAsync` over `isAuthenticated` and call `getSession` AFTER the authentication check or else the session sometimes won't be available

```
// For authenticated user
user_vars: {
  "x-hasura-role":"user",
  "x-hasura-user-isanonymous":"false",
  "x-hasura-user-id":"cef5e0e7-c7eb-4099-b891-1ff5055e1c55"
}

// For public user
user_vars: {"x-hasura-role":"public"}
```

- nhost client automatically sends access token as request header in client graphql requests

```
// If the user is signed in, the user's access token is attached in the Authorization header.

```

##### nhost Auth

- Only way to reliably gain isAuthenticated status is via `isAuthenticatedAsync` (other methods fail due to race/timing conditions)
- `isAuthenticatedAsync` clogs shit up for 15 seconds if nhost server is down, halting everything else in the process.
- App MUST go on with or without hasura, hasura is only enhancement, not a requirement.
- therefore use hacky `onAuthStateChanged` and `isAuthenticated` (sync) to get around this, along with svelte stores to fetch and update user data
- this also means `invalidateAll` won't affect db state.

## Stripe checkout and friends

#### Overview

https://stripe.com/docs/billing/subscriptions/overview

Stripe checkout does not behave like Shopify app subscriptions. Customers/accounts can possess many subscriptions and new subscriptions do not cancel existing subscriptions. On one hand, this gives more feature flexibility such as customer portals and more flexible payment arrangements, customized proration/cancellation policies, and more. But on the other hand, it's a lot more work.

Major subscription lifecycle events can be found here:

https://stripe.com/docs/billing/subscriptions/overview#subscription-events

`checkout.session.completed`
`customer.subscription.created`
`customer.subscription.deleted`
`invoice.created`
`invoice.paid`
`invoice.payment_failed`

#### Test cards

4242424242424242 - Successful payment
4000000000009995 - Failed payment
4000002500003155 - Requires authentication

## License

AI Chat Bestie is licensed under the MIT license. See the LICENSE file for more information.
