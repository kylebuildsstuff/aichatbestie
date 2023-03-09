<script>
  import { getContext } from 'svelte';
  import { nanoid } from 'nanoid';
  import { page as page$ } from '$app/stores';

  import { chatList$, chats$ } from '$lib/shared/shared.store';
  import MenuIcon from '$lib/shared/icons/menu-icon.svelte';
  import PlusIcon from '$lib/shared/icons/plus-icon.svelte';
  import {
    createNewChat,
    createNewChatListItem,
    truncateString
  } from '$lib/shared/shared-utils';
  import { LOCAL_STORAGE_KEY } from '$lib/shared/shared.type';
  import { goto } from '$app/navigation';

  let { openMobileSidebar, handleCloseMobileSidebar } = getContext('sidebar');

  $: chatId = $page$.params.chatId;
  $: title = truncateString(
    $chatList$.find((chat) => chat.chatId === chatId)?.title || 'New chat',
    40
  );

  const handleCreateNewChat = () => {
    // https://zelark.github.io/nano-id-cc/
    const newChatId = nanoid(5);

    chatList$.update((chatList) => {
      chatList.unshift(createNewChatListItem(newChatId));
      return chatList;
    });
    chats$.update((chats) => {
      chats[newChatId] = createNewChat(newChatId);
      return chats;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
    localStorage.setItem(newChatId, JSON.stringify($chats$[newChatId]));

    goto(`/chat/${newChatId}`);
    handleCloseMobileSidebar();
  };
</script>

<div
  class="sticky flex justify-between items-center top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-800"
>
  <button
    type="button"
    class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    on:click={openMobileSidebar}
  >
    <span class="sr-only">Open sidebar</span>
    <MenuIcon />
  </button>

  <span class="text-gray-300"> {title} </span>

  <button
    type="button"
    class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    on:click={handleCreateNewChat}
  >
    <span class="sr-only">New chat</span>
    <PlusIcon />
  </button>
</div>
