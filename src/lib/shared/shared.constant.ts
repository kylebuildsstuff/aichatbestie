import { MESSAGE_ROLE } from './shared.type';

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
