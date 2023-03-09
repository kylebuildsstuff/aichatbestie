<script lang="ts">
  import { nanoid } from 'nanoid';
  import { goto } from '$app/navigation';

  import PlusIcon from '$lib/shared/icons/plus-icon.svelte';
  import { chatList$, chats$ } from '$lib/shared/shared.store';
  import { createNewChat, createNewChatListItem } from '$lib/shared/shared-utils';
  import { LOCAL_STORAGE_KEY } from '$lib/shared/shared.type';

  import SidebarChatItem from './sidebar-chat-item.svelte';

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
  };
</script>

<div class="flex flex-1 flex-col overflow-auto">
  <nav class="flex-1 px-2 py-3 bg-gray-800 space-y-1">
    <button
      on:click={handleCreateNewChat}
      class={`w-full text-gray-300 hover:bg-gray-700 flex items-center px-2 py-3 text-sm font-medium rounded-md mb-3 shadow-sm ring-1 ring-inset ring-gray-400 `}
    >
      <PlusIcon
        extraClasses={'text-gray-400 hover:text-gray-500 mr-3 flex-shrink-0 h-5 w-5'}
      />
      New chat
    </button>

    {#each $chatList$ as { chatId: cId, title }, index}
      <SidebarChatItem
        chatId={cId}
        {title}
      />
    {/each}
  </nav>
</div>
