<script lang="ts">
  import { getContext, onMount } from 'svelte';

  import { PROMPT_OPTIONS } from '$lib/shared/shared.constant';
  import { resizeTextarea } from '$lib/shared/shared-utils';
  import ExclamationCircle from '$lib/shared/icons/exclamation-circle.svelte';
  import { isUpgraded$ } from '$lib/shared/shared.store';

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
    <!-- Upgrade banner -->
    {#if !$isUpgraded$}
      <div class={`w-full rounded-md bg-blue-50 p-4 my-2`}>
        <div class="flex">
          <div class="flex-shrink-0">
            <ExclamationCircle overrideClasses={`w-6 h-6 text-blue-400`} />
          </div>
          <div class="ml-3 z-10">
            <h3 class={`text-sm font-medium text-blue-800`}>
              Please upgrade to gain access to the prompt library
            </h3>
            <!-- <div class={`mt-2 text-sm text-blue-700`}>
              <p class="space-y-1">
                <span></span>
              </p>
            </div> -->
          </div>
        </div>
      </div>
    {/if}
  </div>

  <div class="grid grid-cols-1 gap-x-2 gap-y-8 px-4 py-5 sm:p-6 overflow-auto">
    <ul
      class="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4 xl:gap-x-8"
    >
      <!-- Prompt options -->
      {#each PROMPT_OPTIONS as { promptId: pId, promptLabel: label, prompt, characterCount }}
        {@const isSelected = pId === promptId}
        <li class={`relative flex gap-0.5 items-center`}>
          <button
            on:click={() => selectPrompt(pId, prompt)}
            on:dblclick={() => {
              applyPrompt(promptPreview);
              close();
            }}
            disabled={!$isUpgraded$}
            class={`${
              $isUpgraded$ ? '' : `opacity-50`
            } relative w-full hover:cursor-pointer hover:bg-gray-100 rounded p-1 pl-2 ${
              isSelected ? `ring-1 ring-indigo-500 border-indigo-500 z-10` : ''
            }`}
          >
            <p
              class="mt-2 text-left flex gap-1 items-center text-sm font-medium text-gray-900"
            >
              {label}
            </p>
            <p
              class="block text-left text-sm font-medium text-gray-500"
              title="Character count"
            >
              {characterCount} characters
            </p>
          </button>
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
          disabled={!$isUpgraded$}
          type="button"
          class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply as system message
        </button>
        <button
          on:click={() => {
            applyPrompt(promptPreview);
            close();
          }}
          type="submit"
          disabled={!$isUpgraded$}
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
