<script lang="ts">
  import { nanoid } from 'nanoid';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  import { LOCAL_STORAGE_KEY } from '$lib/shared/shared.type';
  import PlusIcon from '$lib/shared/icons/plus-icon.svelte';
  import { chatList$, chats$ } from '$lib/shared/shared.store';
  import { createNewChat, createNewChatListItem } from '$lib/shared/shared-utils';

  export let handleCloseMobileSidebar = () => {};

  /**
   * Create but don't save (yet)
   */
  const handleCreateNewChat = () => {
    // https://zelark.github.io/nano-id-cc/
    const chatId = nanoid(5);
    const key = `${LOCAL_STORAGE_KEY.CHAT_PREFIX}-${chatId}`;

    if (browser) {
      chatList$.update((chatList) => {
        chatList.unshift(createNewChatListItem(key));
        return chatList;
      });
      chats$.update((chats) => {
        chats[key] = createNewChat(chatId);
        return chats;
      });
    }
  };

  const sidebarLinkIconClasses = `text-gray-400 group-hover:text-gray-500 ${'mr-3'} flex-shrink-0 h-6 w-6`;
  const sidebarLinkTextClasses = `text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-${'base'} font-medium rounded-md`;
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
      class={sidebarLinkTextClasses}
    >
      <PlusIcon extraClasses={sidebarLinkIconClasses} />
      New chat
    </button>

    <a
      on:click={handleCloseMobileSidebar}
      href="/"
      class={sidebarLinkTextClasses}
    >
      <!-- Heroicon name: outline/folder -->
      <svg
        class={sidebarLinkIconClasses}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Templates
    </a>
  </nav>
</div>
