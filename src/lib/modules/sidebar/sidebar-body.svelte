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

<div class="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
  <div class="flex items-center flex-shrink-0 px-4">
    <button on:click={() => goto('/')}>
      <img
        class="h-16 w-auto cursor-pointer"
        src="https://keylayapps.nyc3.cdn.digitaloceanspaces.com/copybuddy/copybuddy-logo-circle.svg"
        alt="AI Chat Bestie"
      />
    </button>
  </div>

  <nav class="mt-5 flex-1 px-2 bg-white space-y-1">
    <button
      on:click={handleCreateNewChat}
      class={`w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-3 text-sm font-medium rounded-md mb-3 shadow-sm ring-1 ring-inset ring-gray-300 `}
    >
      <PlusIcon
        extraClasses={'text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-5 w-5'}
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
