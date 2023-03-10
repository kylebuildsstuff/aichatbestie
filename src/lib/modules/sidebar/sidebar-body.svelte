<script lang="ts">
  import { nanoid } from 'nanoid';
  import { getContext } from 'svelte';
  import Fuse from 'fuse.js';
  import { goto } from '$app/navigation';

  import MagnifyingGlassIcon from '$lib/shared/icons/magnifying-glass-icon.svelte';
  import PlusIcon from '$lib/shared/icons/plus-icon.svelte';
  import { chatList$, chats$ } from '$lib/shared/shared.store';
  import { createNewChat, createNewChatListItem } from '$lib/shared/shared-utils';
  import { LOCAL_STORAGE_KEY } from '$lib/shared/shared.type';

  import SidebarChatItem from './sidebar-chat-item.svelte';

  let { handleCloseMobileSidebar } = getContext('sidebar') as any;

  const chatListFuseOptions = {
    // Lower threshold = closer match
    threshold: 0.3,
    keys: ['title']
  };

  const chatsFuseOptions = {
    // Lower threshold = closer match
    threshold: 0.5,
    keys: ['messages.content']
  };

  let searchInput;
  let isSearchInputFocused = false;
  let searchQuery = '';

  $: chatListFuse = new Fuse($chatList$, chatListFuseOptions);
  $: chatsFuse = new Fuse(Object.values($chats$), chatsFuseOptions);

  $: searchedChats = chatsFuse.search(searchQuery).map((result) => result.item);
  $: searchedChatList = chatListFuse.search(searchQuery).map((result) => result.item);

  $: matchedChatIds = [
    ...new Set([
      ...searchedChats.map((chat) => chat.chatId),
      ...searchedChatList.map((chat) => chat.chatId)
    ])
  ];

  $: chatList = searchQuery
    ? $chatList$.filter((chat) => matchedChatIds.includes(chat.chatId))
    : $chatList$;

  /**
   * Search
   */
  const handleKeydown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;

    // "s" key
    if ((key === '/' || keyCode === 191) && !isSearchInputFocused) {
      event.stopPropagation();
      event.preventDefault();
      searchInput?.focus?.();
    }
  };

  const handleSearchFocus = () => {
    isSearchInputFocused = true;
  };

  const handleSearchBlur = () => {
    isSearchInputFocused = false;
  };

  /**
   * Create new chat
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

    localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
    localStorage.setItem(newChatId, JSON.stringify($chats$[newChatId]));

    goto(`/chat/${newChatId}`);
    handleCloseMobileSidebar();
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex flex-1 flex-col overflow-auto">
  <nav class="flex-1 px-2 py-3 bg-gray-800 space-y-1">
    <!-- New chat -->
    <button
      on:click={handleCreateNewChat}
      class={`w-full text-gray-300 hover:bg-gray-500 flex items-center px-2 py-3 text-sm font-medium rounded-md mb-2 shadow-sm ring-1 ring-inset ring-gray-400 `}
    >
      <PlusIcon
        overrideClasses={'text-gray-400 hover:text-gray-500 mr-3 flex-shrink-0 h-5 w-5'}
      />
      New chat
    </button>

    <!-- Search -->
    <div class="relative flex flex-grow">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon overrideClasses={`h-5 w-5 text-gray-400`} />
      </div>
      <input
        bind:value={searchQuery}
        bind:this={searchInput}
        on:focus={handleSearchFocus}
        on:blur={handleSearchBlur}
        placeholder="Search"
        type="text"
        name="search"
        class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <kbd
          class="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-xs text-gray-400"
          >/</kbd
        >
      </div>
    </div>

    {#each chatList as { chatId: cId, title }, index}
      <SidebarChatItem
        chatId={cId}
        {title}
      />
    {/each}

    <!-- Empty state -->
    {#if !chatList.length || chatList.length === 0}
      <div class="flex flex-col items-center justify-center h-full">
        <div class="text-gray-400 text-sm">No chats found</div>
        <button
          on:click={handleCreateNewChat}
          class="mt-2 text-gray-400 hover:text-gray-500 text-sm border border-gray-400 rounded-md px-2 py-1"
        >
          Create new chat
        </button>
      </div>
    {/if}
  </nav>
</div>
