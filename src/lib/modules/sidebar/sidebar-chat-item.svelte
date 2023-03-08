<script lang="ts">
  import { getContext } from 'svelte';
  import { page as page$ } from '$app/stores';
  import { goto } from '$app/navigation';

  import ChatBubbleLeftIcon from '$lib/shared/icons/chat-bubble-left-icon.svelte';
  import { truncateString } from '$lib/shared/shared-utils';
  import { chatList$, chats$ } from '$lib/shared/shared.store';
  import { LOCAL_STORAGE_KEY } from '$lib/shared/shared.type';
  import PencilSquareIcon from '$lib/shared/icons/pencil-square-icon.svelte';
  import TrashIcon from '$lib/shared/icons/trash-icon.svelte';

  let { handleCloseMobileSidebar } = getContext('sidebar') as any;

  export let chatId;
  export let title;

  /**
   * Delete chat
   */
  const handleDeleteChat = (chatId: string) => {
    chatList$.update((chatList) => {
      chatList = chatList.filter((chat) => chat.chatId !== chatId);
      return chatList;
    });
    chats$.update((chats) => {
      delete chats[chatId];
      return chats;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
    localStorage.removeItem(chatId);

    if ($page$.params?.chatId === chatId) {
      goto('/');
    }
  };
</script>

<button
  on:click={() => {
    goto(`/chat/${chatId}`);
    handleCloseMobileSidebar();
  }}
  class={`w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
    chatId === $page$?.params?.chatId ? `text-gray-900 bg-gray-200` : ''
  }`}
>
  <div class="flex flex-1 justify-start items-center flex-nowrap">
    <ChatBubbleLeftIcon
      extraClasses={`text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-5 w-5`}
    />
    <span
      class="text-left overflow-hidden whitespace-nowrap"
      {title}
    >
      {truncateString(title)}
    </span>
  </div>

  <div class="flex gap-2">
    <button on:click={() => handleDeleteChat(chatId)}>
      <PencilSquareIcon
        extraClasses={`text-gray-400 hover:text-gray-900 h-3.5 w-3.5`}
      />
    </button>
    <button on:click={() => handleDeleteChat(chatId)}>
      <TrashIcon extraClasses={`text-gray-400 hover:text-gray-900 h-3.5 w-3.5`} />
    </button>
  </div>
</button>
