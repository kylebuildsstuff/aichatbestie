<script lang="ts">
  import { getContext } from 'svelte';
  import { nanoid } from 'nanoid';
  import { goto } from '$app/navigation';
  import { page as page$ } from '$app/stores';

  import PlusIcon from '$lib/shared/icons/plus-icon.svelte';
  import { chatList$, chats$ } from '$lib/shared/shared.store';
  import { createNewChat, createNewChatListItem } from '$lib/shared/shared-utils';
  import ChatBubbleLeftIcon from '$lib/shared/icons/chat-bubble-left-icon.svelte';
  import TrashIcon from '$lib/shared/icons/trash-icon.svelte';
  import { LOCAL_STORAGE_KEY } from '$lib/shared/shared.type';
  // import PencilSquareIcon from '$lib/shared/icons/pencil-square-icon.svelte';

  let { handleCloseMobileSidebar } = getContext('sidebar') as any;

  /**
   * Create but don't save (yet)
   */
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

    goto(`/chat/${newChatId}`);
  };

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

  const sidebarLinkIconClasses = `text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-5 w-5`;
  const sidebarLinkTextClasses = `w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-3 text-base font-medium rounded-md`;
  const activeSidebarLinkTextClasses = `text-gray-900 bg-gray-200`;
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
      class={`${sidebarLinkTextClasses} mb-3 shadow-sm ring-1 ring-inset ring-gray-300 `}
    >
      <PlusIcon extraClasses={sidebarLinkIconClasses} />
      New chat
    </button>

    {#each $chatList$ as { chatId: cId, title }, index}
      <button
        on:click={() => {
          goto(`/chat/${cId}`);
          handleCloseMobileSidebar();
        }}
        class={`${sidebarLinkTextClasses} ${
          cId === $page$?.params?.chatId ? activeSidebarLinkTextClasses : ''
        }`}
      >
        <div class="flex flex-1">
          <ChatBubbleLeftIcon extraClasses={sidebarLinkIconClasses} />
          {title}
        </div>

        <div class="flex gap-2">
          <!-- <button on:click={() => handleDeleteChat(cId)}>
            <PencilSquareIcon
              extraClasses={`text-gray-400 hover:text-gray-900 h-3.5 w-3.5`}
            />
          </button> -->
          <button on:click={() => handleDeleteChat(cId)}>
            <TrashIcon extraClasses={`text-gray-400 hover:text-gray-900 h-3.5 w-3.5`} />
          </button>
        </div>
      </button>
    {/each}
  </nav>
</div>
