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

- Update & switch `.env` (dev to prod)
- Build & push Docker images (dependencies & server)
- Update K8s files
- Deploy `nhost` branch (if needed)
- Deploy K8s updates

## Deployment commands

Make sure to switch to the appropriate `Dockerfile` code, using `dependencies.Dockerfile` and `production.Dockerfile`, when running the build commands.

`docker build -t ktruong008/aichatbestie-dependencies:2.0.0 .`
`docker build -t ktruong008/aichatbestie:2.0.0 .`
`docker push ktruong008/aichatbestie-dependencies:2.0.0`

See `keylay-apps-infrastructure` `README` for `k8s` deployment instructions

## Sveltekit data

- Loaders like `+page.ts` and `+layout.ts`, or `+page.server.ts` provide data only to svelte components (`+page.svelte`, `+layout.svelte...`)
- Middleware for API endpoints (`+server.ts`) is handled via `hooks.ts`
- Data loaded within loaders are not transferable to server-side API endpoints, which is why hooks are used.

## bytea, postgres, and hasura

Postgres supports storing files like audio in the form of `bytea`. Hasura supports this, with a few caveats.

An audio file can be handled as a `blob`, whch are file-like JS objects. `blob` objects can be stored as `bytea` within hasura through a series of steps that converts the `blob` into a `base64` string (hasura requires some sort of string).

Retrieving the same data as `bytea` has proven to be trickier. The data comes out in the form of type string, but not a `base64` encoded string. Ongoing issues about this topic here:

https://github.com/hasura/graphql-engine/issues/3336
https://github.com/bitauth/chaingraph/issues/48

So the data comes back as a string but the string cannot be converted back into a `blob`. I don't know why. Thought it was a hex string and tried converting it to a `uint8array` and then to a `blob` but it didn't work, and the string may not actually have been a hex string in the first place, so hasura returns `bytea` data as a string but not a `base64` encoded string nor a hex string.

Solution seems to be to use a postgres function and convert it at the db level:

https://github.com/hasura/graphql-engine/issues/3336

Alternatively, one could encode the `blob` as `base64` and store it in postgres as a `text` type. This would be a lot easier, but it would be a lot less efficient (takes up more space).

Just tried the computed field method and it doesn't work. The computed field returns a different string than the previous method but it still does not load into the audio object properly.

Saving the encoded `base64` string as `text` and retrieving that and feeding it into an audio object works!

The `base64` string retrieved here is different than the `base64` string from the computed field, which is also different from the attempted `base64` encoded string conversion attempted prior to the computed field. Probably indicates that there was some bug during saving data into a `bytea` field with a `base64` encoded string in the first place. –2022-12-14

Maybe this? https://stackoverflow.com/questions/13124711/storing-a-file-in-postgres-using-node-postgres

More context about storing blobs in db:

- https://stackoverflow.com/questions/4386030/how-to-use-blob-datatype-in-postgres
- https://www.postgresql.org/message-id/20150129142450.b83ce5d0652c39791292d0d5@potentialtech.com
- 1min of audio is about 10mb

Figured there was no need for another table as the text could be stored directly into jsonb, along with with the rest of the form data. `jsonb` row can hold 255mb of data, 2000 chars roughly translates to 1mb of data when encoded as `base64`, so it should do just fine for the time being. Each project should be able to handle about 40,000 characters then.

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

- "If the function does not export a default request/response handler it should not be served as a http endpoint." – Johan Eliasson

## Felte quirks

- InitialValues do not get re-initialized.
- If the html disappears so does the field data
- Something funky going on with FieldArrays and `unsetField`
  https://github.com/pablo-abc/felte/issues/114

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

#### Upgrading/downgrading

Upgrading/downgrading subscriptions can be done through the stripe API using data found in `checkout.session.completed`, mainly a subscriptionId, itemId, and priceId.

Upgrades can change the priceId connected to different products, so it's essentially a product change. Subscription ids and subscription item ids do not change during this process. It should also be noted the item id used in the update subscription API call is unique to the subscription and is not tied to the actual product nor its price id.

Here are the events that trigger right after calling `stripe.subscriptions.update`:

```
customer.updated [evt_1L066BJ01yyFZ0ZAjKTkR8QJ]
invoice.created [evt_1L066BJ01yyFZ0ZAAXRTOODT]
invoice.finalized [evt_1L066BJ01yyFZ0ZAA5BPFC6o]
invoice.paid [evt_1L066BJ01yyFZ0ZAbDz0J9Dd]
invoice.payment_succeeded [evt_1L066CJ01yyFZ0ZA96vy4pi9]
customer.subscription.updated [evt_1L066CJ01yyFZ0ZAoWLvafAE]
invoiceitem.created [evt_1L066CJ01yyFZ0ZA3x2Pi6EP]
```

Note the invoice is automatically paid for. Docs say there is an option to preview prorations but it looks unnecessarily complicated. Proration as a whole looks complicated.

If pursuing upgrading/downgrading, some high-level steps:

- Require webhooks for `invoice` and `customer.subscription` events
- Easy retrieval, update, and linking of subscription id to user
  - from subscriptionId retrieve subscription to get item id, then pair with priceId
- Dynamic logic handling fresh checkouts vs. upgrade/downgrade/cancellation
  - If checkout is fresh, create subscription
  - If checkout is upgrade/downgrade/cancellation, update subscription
  - Ensure data is synced, no duplicate subscriptions
- Probably requires some custom checkout/preview for upgrade/downgrade
- Probably enable proration by default, but rules are wonky

#### Cancelling subscriptions

https://stripe.com/docs/billing/subscriptions/cancel?dashboard-or-api=api

By default cancellations take effect immediately, emitting these events:

```
customer.subscription.deleted [evt_1L08lbJ01yyFZ0ZArCpdB6c1]
```

Subscriptions can be set to cancel at the end of the period too. I didn't find anything with respect to automated refunds, refunds probably have to be processed manually.

High level steps:

- Automated subscription cancellation upon upgrading/downgrading
- Webhooks for `customer.subscription.deleted`
- Easy retrieval, update, and linking of subscription id to user

## Bugs

Safari bugs out on playing `Audio` when the audio is not loaded from a user interaction. Could re-use the same audio object but there's still edge cases and I don't think it's worth the effort.

...nevermind, just tried re-using the same object with updating src and that also doesn't work. Just going to display a Safari-specific banner.

https://stackoverflow.com/questions/31776548/why-cant-javascript-play-audio-files-on-iphone-safari

## Misc.

Converting `mp3` to `mp4` with ffmpeg

`ffmpeg -i baguette-love.mp3 -c:a aac -b:a 192k -c:v copy -shortest baguette-love.mp4`

Downloading youtube shorts

`youtube-dl -o "my_short_video.%(ext)s" https://www.youtube.com/watch?v=hCud2NXCI2M`

Downloading youtube clip (still requires downloading whole video)

`youtube-dl --playlist-start 65 --playlist-end 70 -o "myclip.%(ext)s" https://www.youtube.com/watch?v=HZmI-sbcDRo`

## nhost and auth

- Only way to reliably gain isAuthenticated status is via `isAuthenticatedAsync` (other methods fail due to race/timing conditions)
- `isAuthenticatedAsync` clogs shit up for 15 seconds if nhost server is down, halting everything else in the process.
- App MUST go on with or without hasura, hasura is only enhancement, not a requirement.
- therefore use hacky onAuthStateChanged to get around this, along with svelte stores to fetch and update user data
- this means `invalidateAll` won't affect db state.
