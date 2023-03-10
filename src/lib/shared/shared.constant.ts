import { MESSAGE_ROLE } from './shared.type';

export const LOGO_CDN_LINK = '';

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
