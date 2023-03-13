import { browser } from '$app/environment';

import {
  chats$,
  chatList$,
  openAiApiKey$,
  chatFolders$
} from '$lib/shared/shared.store';
import { LOCAL_STORAGE_KEY } from '$lib/shared/shared.type';

export const load = async () => {
  /**
   * Sync localStorage to stores
   */
  if (browser) {
    const openAiApiKey = localStorage.getItem(LOCAL_STORAGE_KEY.OPEN_AI_API_KEY);
    const chatList = localStorage.getItem(LOCAL_STORAGE_KEY.CHAT_LIST);
    const chatFolders = localStorage.getItem(LOCAL_STORAGE_KEY.CHAT_FOLDERS);

    // API key
    if (openAiApiKey) {
      openAiApiKey$.set(openAiApiKey);
    }

    // Chat folders
    if (chatFolders) {
      const parsedChatFolders = JSON.parse(chatFolders);
      console.log('parsedChatFolders: ', parsedChatFolders);
      chatFolders$.set(parsedChatFolders);
    }

    // Chat list
    if (chatList) {
      const parsedChatList = JSON.parse(chatList);
      chatList$.set(parsedChatList);

      // Chats
      if (parsedChatList.length > 0) {
        parsedChatList.forEach((listItem: any) => {
          const chatId = listItem.chatId;
          // chats$ messages should already be present in localStorage, else ¯\_(ツ)_/¯
          const chat = localStorage.getItem(chatId);
          if (chat) {
            chats$.update((chats) => {
              return {
                ...chats,
                [chatId]: JSON.parse(chat)
              };
            });
          }
        });
      }
    }
  }

  return {};
};
