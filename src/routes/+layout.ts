import { browser } from '$app/environment';

import { chats$, chatList$, openAiApiKey$ } from '$lib/shared/shared.store';
import { LOCAL_STORAGE_KEY } from '$lib/shared/shared.type';

export const load = async () => {
  /**
   * Sync localStorage to stores
   */
  if (browser) {
    const openAiApiKey = localStorage.getItem(LOCAL_STORAGE_KEY.OPEN_AI_API_KEY);
    const chatList = localStorage.getItem(LOCAL_STORAGE_KEY.CHAT_LIST);

    if (openAiApiKey) {
      openAiApiKey$.set(openAiApiKey);
    }

    if (chatList) {
      const parsedChatList = JSON.parse(chatList);
      chatList$.set(parsedChatList);

      if (parsedChatList.length > 0) {
        parsedChatList.forEach((listItem: any) => {
          const chatId = listItem.chatId;
          // chats$ messages should already be present in localStorage
          const chat = localStorage.getItem(`${LOCAL_STORAGE_KEY.CHAT}-${chatId}`);
          if (chat) {
            chats$.set({ [chatId]: JSON.parse(chat) });
          }
        });
      }
    }
  }

  return {};
};
