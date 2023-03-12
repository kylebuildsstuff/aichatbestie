<script lang="ts">
  import { getContext, onMount } from 'svelte';

  import { PROMPT_OPTIONS } from '$lib/shared/shared.constant';
  import { resizeTextarea } from '$lib/shared/shared-utils';

  const { close } = getContext('simple-modal') as any;

  export let updateSystemMessage;
  export let applyPrompt;

  let promptId;
  let promptPreview = '';
  let promptPreviewRef;

  const selectPrompt = (pId, prompt) => {
    promptId = pId;
    promptPreview = prompt;

    promptPreviewRef.style.height = 'auto';
    promptPreviewRef.style.height = `${promptPreviewRef.scrollHeight}px`;
  };

  onMount(() => {
    promptPreviewRef.style.height = 'auto';
    promptPreviewRef.style.height = `${promptPreviewRef.scrollHeight}px`;
  });
</script>

<div class="bg-white rounded-lg border-gray-200 divide-y">
  <div class="bg-white px-3 py-2">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Prompts</h3>
  </div>

  <div class="grid grid-cols-1 gap-x-2 gap-y-8 px-4 py-5 sm:p-6 overflow-auto">
    <ul
      class="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4 xl:gap-x-8"
    >
      <!-- Prompt options -->
      {#each PROMPT_OPTIONS as { promptId: pId, promptLabel: label, prompt, characterCount }}
        {@const isSelected = pId === promptId}
        <li class={`relative flex gap-0.5 items-center`}>
          <div
            on:click={() => selectPrompt(pId, prompt)}
            on:dblclick={() => {
              applyPrompt(promptPreview);
              close();
            }}
            on:keydown={() => {}}
            class={`relative w-full hover:cursor-pointer hover:bg-gray-100 rounded p-1 pl-2 ${
              isSelected ? `ring-1 ring-indigo-500 border-indigo-500 z-10` : ''
            }`}
          >
            <p class="mt-2 flex gap-1 items-center text-sm font-medium text-gray-900">
              {label}
            </p>
            <p
              class="block text-sm font-medium text-gray-500"
              title="Accent origin"
            >
              {characterCount} characters
            </p>
          </div>
        </li>
      {/each}
    </ul>

    <!-- Prompt preview -->
    <div class="flex flex-col gap-2">
      <label
        for="prompt-preview"
        class="block  text-sm font-medium text-gray-700"
      >
        Prompt preview
      </label>
      <textarea
        bind:this={promptPreviewRef}
        bind:value={promptPreview}
        on:input={resizeTextarea}
        id="prompt-preview"
        class="block resize-y w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
      />
    </div>
  </div>

  <!-- CTAs -->
  <div class="pt-5">
    <div class="flex flex-col items-end justify-end">
      <div class="flex gap-2">
        <button
          on:click={() => {
            close();
          }}
          type="button"
          class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          on:click={() => {
            updateSystemMessage(promptPreview);
            close();
          }}
          type="button"
          class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply as system message
        </button>
        <button
          on:click={() => {
            applyPrompt();
            close();
          }}
          disabled={false}
          class="disabled:opacity-50 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply prompt
        </button>
      </div>
      <span class="flex justify-end mt-1 text-xs text-gray-500">
        Double-clicking the selection also applies the prompt.
      </span>
    </div>
  </div>
</div>
