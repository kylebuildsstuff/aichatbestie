export enum NHOST_AUTH_STATE {
  SIGNED_IN = 'SIGNED_IN',
  SIGNED_OUT = 'SIGNED_OUT'
}

export enum HASURA_ROLE {
  USER = 'user',
  HASURA = 'hasura'
}

export enum STRIPE_PAYMENT_MODE {
  // one-time
  PAYMENT = 'payment',
  SUBSCRIPTION = 'subscription'
}

export enum PAYMENT_TYPE {
  LIFETIME = 'LIFETIME',
  MONTHLY = 'MONTHLY'
}

export enum APP_PRODUCT {
  BESTIES_FOREVER = 'BESTIES_FOREVER'
}

export enum APP_SUBSCRIPTION_TYPE {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
  QUATERNARY = 'QUATERNARY'
}

export enum LOCAL_STORAGE_KEY {
  OPEN_AI_API_KEY = 'openAiApiKey',
  CHAT_LIST = 'bChatList',
  SAVED_PROMPTS = 'bSavedPrompts',
  GPT_MODEL = 'bGptModel'

  // e.g. bChat-123456789
  // CHAT_PREFIX = 'bChat'
}

export enum MESSAGE_ROLE {
  SYSTEM = 'system',
  ASSISTANT = 'assistant',
  USER = 'user'
}

export enum BANNER_TYPE {
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success'
}

export enum ERROR {
  LOCAL_STORAGE_SET_ITEM = 'LOCAL_STORAGE_SET_ITEM',
  OPENAI_CHAT_COMPLETION = 'OPENAI_CHAT_COMPLETION',
  REGISTRATION = 'REGISTRATION',
  LOGIN = 'LOGIN',
  PASSWORD_RESET = 'PASSWORD_RESET',
  USER_DATA_FETCH = 'USER_DATA_FETCH',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  CHECKOUT_SESSION_CREATE = 'CHECKOUT_SESSION_CREATE',
  DATA_SYNC_SAVE = 'CHAT_SYNC_SAVE',
  DATA_SYNC_SAVE_LIMIT = 'CHAT_SYNC_SAVE_LIMIT',
  DATA_SYNC_IMPORT = 'CHAT_SYNC_IMPORT',
  DATA_SYNC_DELETE_SAVED_CHAT = 'CHAT_SYNC_DELETE_SAVED_CHAT'
}

export enum PROMPT_TAG {
  CUSTOM = 'Custom',
  STORY = 'Story',
  BUSINESS = 'Business',
  DEVELOPER = 'Developer',
  LANGUAGE = 'Language',
  MARKETING = 'Marketing',
  WRITING = 'Writing',
  TECH = 'Tech',
  CAREER = 'Career',
  PERSONAL = 'Personal',
  AI = 'AI',
  MISCALLANEOUS = 'Miscellaneous'
}

// https://platform.openai.com/docs/models/gpt-4
export enum GPT_MODEL {
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  GPT_3_5_TURBO_0301 = 'gpt-3.5-turbo-0301',

  // Vanilla
  GPT_4 = 'gpt-4',
  // gpt-4 from March 14th 2023
  GPT_4_0314 = 'gpt-4-0314',
  // gpt-4 but with 4x context length
  GPT_4_32k = 'gpt-4-32k',
  // gpt-4-32k from March 14th 2023
  GPT_4_32k_0314 = 'gpt-4-32k-0314'
}

export type Message = {
  role: MESSAGE_ROLE;
  content: string;
};

export type ChatListItem = {
  chatId: string;
  title: string;
};

export type Chat = {
  chatId: string;
  messages: Message[];
};

export type SavedPrompt = {
  title: string;
  prompt: string;
};

// Reference only
// type LocalStorage = {
//   [LOCAL_STORAGE_KEY.OPEN_AI_API_KEY]: string;
//   [LOCAL_STORAGE_KEY.CHAT_LIST]: ChatListItem[];
//   [LOCAL_STORAGE_KEY.CHAT_FOLDERS]: ChatFolder[];
//   // [chatId: string]: Chat;
// };

/**
 * Bound to stripe products, appears in completed-checkout webhook
 */
// type CheckoutSessionMetadata = {
//   // app_subscription_type?: APP_SUBSCRIPTION_TYPE;
//   // metadata behaves like .env, values are strings
//   // is_PREPAID?: string;
//   // characters: number;
// };

// https://stripe.com/docs/api/checkout/sessions/object
type CheckoutSession = {
  id: string;
  object: string;
  after_expiration: any;
  allow_promotion_codes: any;
  // 500 = $5
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: {
    enabled: boolean;
    status: any;
  };
  billing_address_collection: any;
  cancel_url: string;
  client_reference_id: any;
  consent: any;
  consent_collection: any;
  currency: string;
  customer: string;
  customer_creation: string;
  customer_details: {
    email: string;
    phone: any;
    tax_exempt: string;
    tax_ids: [];
  };
  customer_email: any;
  expires_at: number;
  livemode: false;
  locale: any;
  metadata: any;
  mode: string;
  payment_intent: string;
  payment_link: any;
  payment_method_options: any;
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: {
    enabled: false;
  };
  recovered_from: any;
  setup_intent: any;
  shipping: any;
  shipping_address_collection: any;
  shipping_options: any[];
  shipping_rate: any;
  status: string;
  submit_type: any;
  subscription: any;
  success_url: string;
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  };
  url: any;
};

/**
 * Important for id and created
 *
 * https://stripe.com/docs/api/events/object
 */
export type StripeEvent = {
  id: string;
  object: string;
  api_version: string;
  created: number;
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: any;
    idempotency_key: any;
  };
  type: string;
  data: {
    object: CheckoutSession;
  };
  // custom field (foreign key)
  user_id: string;
};

/**
 * Fields are stored using snake_case but graphql fields use camelCase
 */
export type User = {
  // uuid
  id: string;
  createdAt: string;
  updatedAt: string;
  lastSeen: string;
  disabled: string;
  // displayName: string;
  // avatarUrl: string;
  // locale: string;
  email: string;
  // phoneNumber: string;
  // passwordHash: string;
  emailVerified: boolean;
  // phoneNumberverified: boolean;
  // newEmail: string;
  // otpMethodlastused: string;
  // otpHash: string;
  // otpHashexpiresat: string;
  // defaultRole: string;
  // isAnonymous: boolean;
  // totpSecret: string;
  // activeMfatype: string;
  // ticket: string;
  // ticketExpiresat: string;
  // metadata: Record<string, any>;
};

export type UserSettings = {
  userId: string;

  isUpgraded: boolean;
};

type SavedChat = {
  id: string;
  title: string;
  messages: Message[];
};

export type SavedChats = {
  id: string;
  userId: string;

  label: string;
  chats: SavedChat[];

  createdAt: string;
  updatedAt: string;
};

// In-memory only
export type Banner = {
  bannerId: string;
  bannerType: BANNER_TYPE;
  title: string;
  description: string;
};
