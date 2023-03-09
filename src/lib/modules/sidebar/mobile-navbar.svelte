<script>
  import { getContext } from 'svelte';
  import { page as page$ } from '$app/stores';

  import { chatList$ } from '$lib/shared/shared.store';
  import MenuIcon from '$lib/shared/icons/menu-icon.svelte';
  import { truncateString } from '$lib/shared/shared-utils';

  let { openMobileSidebar } = getContext('sidebar');

  $: chatId = $page$.params.chatId;
  $: title = truncateString(
    $chatList$.find((chat) => chat.chatId === chatId)?.title || 'New chat',
    50
  );
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

  <!-- Flex spacer -->
  <div />
</div>
