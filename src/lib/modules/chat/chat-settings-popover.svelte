<script lang="ts">
  import { getContext } from 'svelte';

  import { onClickOutside } from '$lib/shared/shared-utils';

  let { showChatSettings$ } = getContext('chat') as any;
</script>

<div
  use:onClickOutside
  on:clickoutside={() => showChatSettings$.set(false)}
  class="relative left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4"
>
  <div
    class="w-56 shrink rounded-xl bg-white p-3 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5"
  >
    <h3
      class="pt-2 px-2 pb-1 w-full text-start text-xs font-medium leading-6 text-gray-500 border-b border-gray-200"
    >
      CHAT SETTINGS
    </h3>

    <button
      on:click={() => {}}
      class="w-full p-2 text-start hover:bg-gray-100 rounded-b-md"
    >
      Change API key
    </button>

    <button
      on:click={() => {}}
      class="w-full p-2 text-start hover:bg-gray-100 rounded-md"
    >
      System prompt
    </button>

    <button
      on:click={() => {}}
      class="w-full p-2 text-start hover:bg-gray-100 rounded-md"
    >
      Characters
    </button>
    <button
      on:click={() => {}}
      class="w-full p-2 text-start hover:bg-gray-100 rounded-md"
    >
      Prompt recipes
    </button>
  </div>
</div>
