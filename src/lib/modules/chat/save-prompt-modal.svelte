<script lang="ts">
  import { resizeTextarea } from '$lib/shared/shared-utils';
  import { getContext, onMount } from 'svelte';

  const { close } = getContext('simple-modal') as any;

  export let inputMessage = '';
  export let savePrompt;

  let textareaRef;
  let title = '';

  onMount(() => {
    textareaRef.style.height = 'auto';
    textareaRef.style.height = `${textareaRef.scrollHeight}px`;
  });

  const handleCta = () => {
    savePrompt(inputMessage, title);
    close();
  };
</script>

<div class="bg-white rounded-lg border-gray-200 divide-y">
  <div class="bg-white px-3 py-2">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Save prompt</h3>
  </div>

  <div class="px-4 py-5 sm:p-6">
    <!-- Prompt title -->
    <label
      for="name"
      class="block text-sm font-medium text-gray-700"
    >
      Title
    </label>
    <textarea
      bind:this={textareaRef}
      bind:value={title}
      on:input={resizeTextarea}
      rows={1}
      id="prompt-title"
      name="prompt-title"
      class={`block w-full text-sm mt-1 pl-3 pr-10 py-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 flex-1`}
    />
  </div>

  <div class="pt-5">
    <div class="flex gap-2 justify-end">
      <button
        on:click={() => close()}
        type="button"
        class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
      <button
        on:click={handleCta}
        disabled={!title}
        class="disabled:opacity-50 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </div>
</div>
