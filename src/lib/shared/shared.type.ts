export enum LOCAL_STORAGE_KEY {
  OPEN_AI_API_KEY = 'openAiApiKey',
  CHAT_LIST = 'bChatList',
  // e.g. bChat-123456789
  CHAT_PREFIX = 'bChat'
}

export enum MESSAGE_ROLE {
  SYSTEM = 'system',
  ASSISTANT = 'assistant',
  USER = 'user'
}

export type Message = {
  role: MESSAGE_ROLE;
  content: string;
};

export type ChatListItem = {
  chatId: string;
  title: string;
  description: string;
};

export type Chat = {
  chatId: string;
  systemMessage: string;
  messages: Message[];
};
