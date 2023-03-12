import { MESSAGE_ROLE } from './shared.type';

export const LOGO_CDN_LINK =
  'https://keylayapps.nyc3.cdn.digitaloceanspaces.com/ai-chat-bestie%2Flogo%2Fai-chat-bestie-logo.png';
export const LOGO_THUMBNAIL_CDN_LINK = `https://keylayapps.nyc3.cdn.digitaloceanspaces.com/ai-chat-bestie%2Flogo%2Fai-chat-bestie-thumbnail.png`;
export const LOGO_THUMBNAIL_CDN_LINK_BG = `https://keylayapps.nyc3.cdn.digitaloceanspaces.com/ai-chat-bestie%2Flogo%2Fai-chat-bestie-thumbnail-bg.png`;
export const USER_ICON_THUMBNAIL_BG_CDN_LINK = `https://keylayapps.nyc3.cdn.digitaloceanspaces.com/ai-chat-bestie%2Fuser-icon-thumbnail-bg.png`;

export const PRIVACY_POLICY_LINK = `https://aichatbestie.notion.site/Privacy-policy-2dad1adbd8c045e7a431070456647ef7`;

export const EMAIL_LINK = `mailto:aichatbestie@gmail.com`;
export const DISCORD_LINK = `https://discord.gg/xDWFE3n6dc`;
export const YOUTUBE_LINK = `https://www.youtube.com/@aichatbestie`;
export const TWITTER_LINK = `https://twitter.com/@kylebuildsstuff`;

export const DEFAULT_SYSTEM_MESSAGE_CONTENT = `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.`;
export const CHAT_LABELLING_PROMPT = `What would be a short and relevant title for this chat? You must strictly answer with only the title. No other text is allowed.`;

export const DEFAULT_SYSTEM_MESSAGE = {
  role: MESSAGE_ROLE.SYSTEM,
  content: DEFAULT_SYSTEM_MESSAGE_CONTENT
};

export const CHAT_COMPLETION_ENDPOINT = `https://api.openai.com/v1/chat/completions`;

export const NOTIFICATION_SETTINGS = {
  position: 'bottom-center',
  removeAfter: 2500
};

// export const PRICING_CONFIG = {
//   [APP_PRODUCT.BESTIES_FOREVER]: {
//     appProduct: APP_PRODUCT.BESTIES_FOREVER,

//   }
// }

/**
 * https://github.com/f/awesome-chatgpt-prompts
 */
export const ADVERTISTER_PROMPT = `I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. My first suggestion request is "I need help creating an advertising campaign for a new type of energy drink targeting young adults aged 18-30."`;
export const STORYTELLER_PROMPT = `I want you to act as a storyteller. You will come up with entertaining stories that are engaging, imaginative and captivating for the audience. It can be fairy tales, educational stories or any other type of stories which has the potential to capture people's attention and imagination. Depending on the target audience, you may choose specific themes or topics for your storytelling session e.g., if it’s children then you can talk about animals; If it’s adults then history-based tales might engage them better etc. My first request is "I need an interesting story on perseverance."`;
