import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { chats$ } from '$lib/shared/shared.store';

export const load = async ({ params }) => {
  const chatId = params.chatId;

  console.log('loaderchatId: ', chatId);

  // const chat = get(chats$) || (browser && localStorage.getItem(chatId));

  return {
    chatId
  };
};
