<script lang="ts">
  import { getContext } from 'svelte';

  import { onClickOutside } from '$lib/shared/shared-utils';
  import BookOpenIcon from '$lib/shared/icons/book-open-icon.svelte';
  import WrenchIcon from '$lib/shared/icons/wrench-icon.svelte';
  import KeyIcon from '$lib/shared/icons/key-icon.svelte';
  import BookmarkIcon from '$lib/shared/icons/bookmark-icon.svelte';
  import Cog_2Icon from '$lib/shared/icons/cog-2-icon.svelte';

  let {
    openPromptsModal,
    openSavePromptModal,
    openSystemMessageModal,
    openApiKeyModal,
    showChatSettings$
  } = getContext('chat') as any;
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
      on:click={() => {
        openPromptsModal();
        showChatSettings$.set(false);
      }}
      class="flex items-center gap-2 w-full p-2 text-start hover:bg-gray-100 rounded-md"
    >
      <BookOpenIcon overrideClasses={`w-4 h-4 text-gray-500`} />
      Prompt library
    </button>
    <button
      on:click={openSavePromptModal}
      class="flex items-center gap-2 w-full p-2 text-start hover:bg-gray-100 rounded-md"
    >
      <BookmarkIcon overrideClasses={`w-4 h-4 text-gray-500`} />
      Save prompt
    </button>

    <button
      on:click={() => {
        openSystemMessageModal();
        showChatSettings$.set(false);
      }}
      class="flex items-center gap-2 w-full p-2 text-start hover:bg-gray-100 rounded-md"
    >
      <WrenchIcon overrideClasses={`w-4 h-4 text-gray-500`} />
      System message
    </button>

    <button
      on:click={() => {
        openApiKeyModal();
        showChatSettings$.set(false);
      }}
      class="flex items-center gap-2 w-full p-2 text-start hover:bg-gray-100 rounded-b-md"
    >
      <Cog_2Icon overrideClasses={`w-4 h-4 text-gray-500`} />
      Model settings
    </button>
    <button
      on:click={() => {
        openApiKeyModal();
        showChatSettings$.set(false);
      }}
      class="flex items-center gap-2 w-full p-2 text-start hover:bg-gray-100 rounded-b-md"
    >
      <KeyIcon overrideClasses={`w-4 h-4 text-gray-500`} />
      Change API key
    </button>
  </div>
</div>
