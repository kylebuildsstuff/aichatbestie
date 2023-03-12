<script lang="ts">
  import { getContext } from 'svelte';

  import { onClickOutside } from '$lib/shared/shared-utils';
  import BookOpenIcon from '$lib/shared/icons/book-open-icon.svelte';
  import UsersIcon from '$lib/shared/icons/users-icon.svelte';
  import WrenchIcon from '$lib/shared/icons/wrench-icon.svelte';
  import KeyIcon from '$lib/shared/icons/key-icon.svelte';

  let {
    openPromptsModal,
    openCharactersModal,
    openSystemPromptModal,
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
      Prompts
    </button>
    <button
      on:click={() => {
        openCharactersModal();
        showChatSettings$.set(false);
      }}
      class="flex items-center gap-2 w-full p-2 text-start hover:bg-gray-100 rounded-md"
    >
      <UsersIcon overrideClasses={`w-4 h-4 text-gray-500`} />
      Characters
    </button>

    <button
      on:click={() => {
        openSystemPromptModal();
        showChatSettings$.set(false);
      }}
      class="flex items-center gap-2 w-full p-2 text-start hover:bg-gray-100 rounded-md"
    >
      <WrenchIcon overrideClasses={`w-4 h-4 text-gray-500`} />
      System prompt
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
