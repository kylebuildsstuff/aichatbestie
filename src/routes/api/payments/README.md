```
// Complete checkout session, with expanded line items –2022-12-09
{
  "id": "cs_test_a1IdO3cRAiDtsfYm6c8sKoFbyLpxibkNrDf56cVIkv5IylfNuzl155fePm",
  "object": "checkout.session",
  "after_expiration": null,
  "allow_promotion_codes": null,
  "amount_subtotal": 2500,
  "amount_total": 2500,
  "automatic_tax": {
    "enabled": false,
    "status": null
  },
  "billing_address_collection": null,
  "cancel_url": "http://localhost:3000/plans",
  "client_reference_id": "667805b6-5823-444c-92ea-4da400131631",
  "consent": null,
  "consent_collection": null,
  "created": 1670614550,
  "currency": "usd",
  "custom_text": {
    "shipping_address": null,
    "submit": null
  },
  "customer": null,
  "customer_creation": "if_required",
  "customer_details": {
    "address": {
      "city": null,
      "country": "CA",
      "line1": null,
      "line2": null,
      "postal_code": "M5J 0A7",
      "state": null
    },
    "email": "ktruong008@gmail.com",
    "name": "asd dsa",
    "phone": null,
    "tax_exempt": "none",
    "tax_ids": []
  },
  "customer_email": null,
  "expires_at": 1670700950,
  "invoice": null,
  "invoice_creation": {
    "enabled": false,
    "invoice_data": {
      "account_tax_ids": null,
      "custom_fields": null,
      "description": null,
      "footer": null,
      "metadata": {},
      "rendering_options": null
    }
  },
  "line_items": {
    "object": "list",
    "data": [
      {
        "id": "li_1MDCMMJzvcwj3o2q5vyFdind",
        "object": "item",
        "amount_discount": 0,
        "amount_subtotal": 2500,
        "amount_tax": 0,
        "amount_total": 2500,
        "currency": "usd",
        "description": "Pay as you go (300,000 characters)",
        "price": {
          "id": "price_1MCRtmJzvcwj3o2quF7cEhQs",
          "object": "price",
          "active": true,
          "billing_scheme": "per_unit",
          "created": 1670435954,
          "currency": "usd",
          "custom_unit_amount": null,
          "livemode": false,
          "lookup_key": null,
          "metadata": {},
          "nickname": null,
          "product": {
            "id": "prod_MwKY83vgfWUpAr",
            "object": "product",
            "active": true,
            "attributes": [],
            "created": 1670435954,
            "default_price": "price_1MCRtmJzvcwj3o2quF7cEhQs",
            "description": "300,000 characters",
            "images": [],
            "livemode": false,
            "metadata": {
              "characters": "300000",
              "is_PREPAID": "true"
            },
            "name": "Pay as you go (300,000 characters)",
            "package_dimensions": null,
            "shippable": null,
            "statement_descriptor": null,
            "tax_code": "txcd_10000000",
            "type": "service",
            "unit_label": null,
            "updated": 1670435955,
            "url": null
          },
          "recurring": null,
          "tax_behavior": "exclusive",
          "tiers_mode": null,
          "transform_quantity": null,
          "type": "one_time",
          "unit_amount": 2500,
          "unit_amount_decimal": "2500"
        },
        "quantity": 1
      }
    ],
    "has_more": false,
    "url": "/v1/checkout/sessions/cs_test_a1IdO3cRAiDtsfYm6c8sKoFbyLpxibkNrDf56cVIkv5IylfNuzl155fePm/line_items"
  },
  "livemode": false,
  "locale": null,
  "metadata": {},
  "mode": "payment",
  "payment_intent": "pi_3MDCMbJzvcwj3o2q009QLB2A",
  "payment_link": null,
  "payment_method_collection": "always",
  "payment_method_options": {},
  "payment_method_types": [
    "card"
  ],
  "payment_status": "paid",
  "phone_number_collection": {
    "enabled": false
  },
  "recovered_from": null,
  "setup_intent": null,
  "shipping_address_collection": null,
  "shipping_cost": null,
  "shipping_details": null,
  "shipping_options": [],
  "status": "complete",
  "submit_type": null,
  // is truthy for subscriptions, shows as string, even without expanded fetch. e.g. sub_1MDCLIJzvcwj3o2qWWcsJT4R
  "subscription": null,
  "success_url": "http://localhost:3000/plans",
  "total_details": {
    "amount_discount": 0,
    "amount_shipping": 0,
    "amount_tax": 0
  },
  "url": null
}


// Completed checkout webhook
const completedCheckoutWebhookPayload = {
  id: 'evt_1KboHJJ01yyFZ0ZA2BcnaacN',
  object: 'event',
  api_version: '2020-08-27',
  created: 1646927505,
  data: {
    object: {
      id: 'cs_test_a11PduYxe7O1AfeDFU2WAyjw2FEv2PLG58ttdtieZr8hx6cJzkULYUiLoQ',
      object: 'checkout.session',
      after_expiration: null,
      allow_promotion_codes: null,
      amount_subtotal: 500,
      amount_total: 500,
      automatic_tax: {
        enabled: false,
        status: null
      },
      billing_address_collection: null,
      cancel_url: 'http://localhost:3000/user/plans',
      client_reference_id: null,
      consent: null,
      consent_collection: null,
      currency: 'usd',
      customer: 'cus_LIP5IRhcFCA5PK',
      customer_creation: 'always',
      customer_details: {
        email: 'ktruong008@gmail.com',
        phone: null,
        tax_exempt: 'none',
        tax_ids: []
      },
      customer_email: null,
      expires_at: 1647013889,
      livemode: false,
      locale: null,
      metadata: {},
      mode: 'payment',
      payment_intent: 'pi_3KboGzJ01yyFZ0ZA0ezqQmJw',
      payment_link: null,
      payment_method_options: {},
      payment_method_types: ['card'],
      payment_status: 'paid',
      phone_number_collection: {
        enabled: false
      },
      recovered_from: null,
      setup_intent: null,
      shipping: null,
      shipping_address_collection: null,
      shipping_options: [],
      shipping_rate: null,
      status: 'complete',
      submit_type: null,
      subscription: null,
      success_url: 'http://localhost:3000/user/plans',
      total_details: {
        amount_discount: 0,
        amount_shipping: 0,
        amount_tax: 0
      },
      url: null
    }
  },
  livemode: false,
  pending_webhooks: 2,
  request: {
    id: null,
    idempotency_key: null
  },
  type: 'checkout.session.completed'
};
```

```
/**
 * Events after update subscription:
 *
 * Same subscription Id, same items.data[0].id
 * different price object, with price Id
 *
 * :44:43   --> customer.updated [evt_1L066BJ01yyFZ0ZAjKTkR8QJ]
2022-05-16 11:44:43  <--  [200] POST http://localhost:3000/api/webhooks/completed-checkout [evt_1L066BJ01yyFZ0ZAjKTkR8QJ]
2022-05-16 11:44:43   --> invoice.created [evt_1L066BJ01yyFZ0ZAAXRTOODT]
2022-05-16 11:44:43  <--  [200] POST http://localhost:3000/api/webhooks/completed-checkout [evt_1L066BJ01yyFZ0ZAAXRTOODT]
2022-05-16 11:44:44   --> invoice.finalized [evt_1L066BJ01yyFZ0ZAA5BPFC6o]
2022-05-16 11:44:44  <--  [200] POST http://localhost:3000/api/webhooks/completed-checkout [evt_1L066BJ01yyFZ0ZAA5BPFC6o]
2022-05-16 11:44:44   --> invoice.paid [evt_1L066BJ01yyFZ0ZAbDz0J9Dd]
2022-05-16 11:44:44  <--  [200] POST http://localhost:3000/api/webhooks/completed-checkout [evt_1L066BJ01yyFZ0ZAbDz0J9Dd]
2022-05-16 11:44:44   --> invoice.payment_succeeded [evt_1L066CJ01yyFZ0ZA96vy4pi9]
2022-05-16 11:44:44  <--  [200] POST http://localhost:3000/api/webhooks/completed-checkout [evt_1L066CJ01yyFZ0ZA96vy4pi9]
2022-05-16 11:44:44   --> customer.subscription.updated [evt_1L066CJ01yyFZ0ZAoWLvafAE]
2022-05-16 11:44:44  <--  [200] POST http://localhost:3000/api/webhooks/completed-checkout [evt_1L066CJ01yyFZ0ZAoWLvafAE]
2022-05-16 11:44:44   --> invoiceitem.created [evt_1L066CJ01yyFZ0ZA3x2Pi6EP]
2022-05-16 11:44:44  <--  [200] POST http://localhost:3000/api/webhooks/completed-checkout [evt_1L066CJ01yyFZ0ZA3x2Pi6EP]
 */
```

```
/**
 * Events after cancel subscription
 *
 * 2022-05-16 14:35:40   --> customer.subscription.deleted [evt_1L08lbJ01yyFZ0ZArCpdB6c1]
2022-05-16 14:35:40  <--  [200] POST http://localhost:3000/api/webhooks/completed-checkout [evt_1L08lbJ01yyFZ0ZArCpdB6c1]

{
  "id": "sub_1Kzpc6J01yyFZ0ZARR510pvV",
  "object": "subscription",
  "application": null,
  "application_fee_percent": null,
  "automatic_tax": {
    "enabled": false
  },
  "billing_cycle_anchor": 1652715882,
  "billing_thresholds": null,
  "cancel_at": null,
  "cancel_at_period_end": false,
  "canceled_at": 1652726139,
  "collection_method": "charge_automatically",
  "created": 1652652513,
  "current_period_end": 1655394282,
  "current_period_start": 1652715882,
  "customer": "cus_LhE421nYqWBGDm",
  "days_until_due": null,
  "default_payment_method": "pm_1Kzpc5J01yyFZ0ZAR0ezPaJZ",
  "default_source": null,
  "default_tax_rates": [],
  "description": null,
  "discount": null,
  "ended_at": 1652726139,
  "items": {
    "object": "list",
    "data": [
      {
        "id": "si_LhE4kexhrrxR3m",
        "object": "subscription_item",
        "billing_thresholds": null,
        "created": 1652652514,
        "metadata": {},
        "plan": {
          "id": "price_1KzS52J01yyFZ0ZAqY8Jar7V",
          "object": "plan",
          "active": true,
          "aggregate_usage": null,
          "amount": 2900,
          "amount_decimal": "2900",
          "billing_scheme": "per_unit",
          "created": 1652562052,
          "currency": "usd",
          "interval": "month",
          "interval_count": 1,
          "livemode": false,
          "metadata": {},
          "nickname": null,
          "product": "prod_LgpkwlMT4CYaWN",
          "tiers_mode": null,
          "transform_usage": null,
          "trial_period_days": null,
          "usage_type": "licensed"
        },
        "price": {
          "id": "price_1KzS52J01yyFZ0ZAqY8Jar7V",
          "object": "price",
          "active": true,
          "billing_scheme": "per_unit",
          "created": 1652562052,
          "currency": "usd",
          "livemode": false,
          "lookup_key": null,
          "metadata": {},
          "nickname": null,
          "product": "prod_LgpkwlMT4CYaWN",
          "recurring": {
            "aggregate_usage": null,
            "interval": "month",
            "interval_count": 1,
            "trial_period_days": null,
            "usage_type": "licensed"
          },
          "tax_behavior": "unspecified",
          "tiers_mode": null,
          "transform_quantity": null,
          "type": "recurring",
          "unit_amount": 2900,
          "unit_amount_decimal": "2900"
        },
        "quantity": 1,
        "subscription": "sub_1Kzpc6J01yyFZ0ZARR510pvV",
        "tax_rates": []
      }
    ],
    "has_more": false,
    "total_count": 1,
    "url": "/v1/subscription_items?subscription=sub_1Kzpc6J01yyFZ0ZARR510pvV"
  },
  "latest_invoice": "in_1L066AJ01yyFZ0ZAHStuFtNS",
  "livemode": false,
  "metadata": {},
  "next_pending_invoice_item_invoice": null,
  "pause_collection": null,
  "payment_settings": {
    "payment_method_options": null,
    "payment_method_types": null
  },
  "pending_invoice_item_interval": null,
  "pending_setup_intent": null,
  "pending_update": null,
  "plan": {
    "id": "price_1KzS52J01yyFZ0ZAqY8Jar7V",
    "object": "plan",
    "active": true,
    "aggregate_usage": null,
    "amount": 2900,
    "amount_decimal": "2900",
    "billing_scheme": "per_unit",
    "created": 1652562052,
    "currency": "usd",
    "interval": "month",
    "interval_count": 1,
    "livemode": false,
    "metadata": {},
    "nickname": null,
    "product": "prod_LgpkwlMT4CYaWN",
    "tiers_mode": null,
    "transform_usage": null,
    "trial_period_days": null,
    "usage_type": "licensed"
  },
  "quantity": 1,
  "schedule": null,
  "start_date": 1652652513,
  "status": "canceled",
  "test_clock": null,
  "transfer_data": null,
  "trial_end": null,
  "trial_start": null
}
 */
```
