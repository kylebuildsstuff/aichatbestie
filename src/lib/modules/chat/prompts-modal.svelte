<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import Fuse from 'fuse.js';

  import { PROMPT_OPTIONS } from '$lib/shared/shared.constant';
  import { resizeTextarea } from '$lib/shared/shared-utils';
  import { banners$, savedPrompts$ } from '$lib/shared/shared.store';
  import {
    BANNER_TYPE,
    ERROR,
    LOCAL_STORAGE_KEY,
    PROMPT_TAG
  } from '$lib/shared/shared.type';

  const { close } = getContext('simple-modal') as any;

  export let updateSystemMessage;
  export let applyPrompt;

  const fuseOptions = {
    threshold: 0.4,
    keys: ['promptLabel', 'tags', 'prompt']
  };

  let promptId;
  let promptPreview = '';
  let promptPreviewRef;
  let searchQuery = '';

  $: _promptOptions = PROMPT_OPTIONS.map((prompt) => ({
    ...prompt,
    isCustom: false
  })).concat(
    $savedPrompts$.map((saved) => ({
      promptId: saved.title,
      promptLabel: saved.title,
      prompt: saved.prompt,
      characterCount: saved.prompt.length,
      isCustom: true,
      tags: [PROMPT_TAG.CUSTOM]
    }))
  );
  $: fuse = new Fuse(_promptOptions, fuseOptions);

  $: promptOptions = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : _promptOptions;

  const deletePrompt = (promptId) => {
    savedPrompts$.update((prompts) => {
      return prompts.filter((prompt) => prompt.title !== promptId);
    });

    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY.SAVED_PROMPTS,
        JSON.stringify($savedPrompts$)
      );
    } catch (e: any) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.LOCAL_STORAGE_SET_ITEM,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Access to browser storage failed',
          description: e?.message || e?.name || ''
        });
        return banners;
      });
    }
  };

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
    <h3 class="text-lg leading-6 font-medium text-gray-900">Prompt library</h3>
  </div>

  <div class="flex flex-wrap md:flex-nowrap gap-5 w-full px-4 py-5 sm:p-6">
    <!-- Search -->
    <div class="w-1/2">
      <label
        for="search"
        class="block text-sm font-medium text-gray-700"
      >
        Search
      </label>
      <div class="md:flex md:items-center">
        <div class="relative">
          <input
            bind:value={searchQuery}
            id="search"
            name="search"
            class={`block w-full text-sm mt-1 pl-3 pr-10 py-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 flex-1`}
            type="search"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Prompt options -->
  <div class="grid grid-cols-1 gap-x-2 gap-y-8 px-4 py-5 sm:p-6 overflow-auto">
    <ul
      class="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4 xl:gap-x-8"
    >
      <!-- Prompt options -->
      {#each promptOptions as { promptId: pId, promptLabel: label, prompt, characterCount, tags = [], isCustom }}
        {@const isSelected = pId === promptId}
        {@const primaryTag = tags[0] || ''}
        <li class={`relative flex gap-0.5 items-center`}>
          <button
            on:click={() => selectPrompt(pId, prompt)}
            on:dblclick={() => {
              applyPrompt(promptPreview);
              close();
            }}
            class={`relative w-full flex flex-col items-start gap-1 hover:cursor-pointer hover:bg-gray-100 rounded p-1 pl-2 ${
              isSelected ? `ring-1 ring-indigo-500 border-indigo-500 z-10` : ''
            }`}
          >
            <p
              class="mt-2 text-left flex gap-1 items-center text-sm font-medium text-gray-900"
            >
              {label}

              {#if primaryTag}
                <button
                  type="button"
                  class="rounded-full bg-white px-1.5 text-xs font-thin text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  {primaryTag}
                </button>
              {/if}
            </p>

            <p
              class="block text-left text-sm font-medium text-gray-500"
              title="Character count"
            >
              {characterCount} characters
            </p>
          </button>

          <!-- Delete icon at the corner -->
          {#if isCustom}
            <button
              on:click={() => deletePrompt(pId)}
              class="absolute z-20 top-0 right-0 p-1 hover:bg-gray-100 rounded"
            >
              <svg
                class="h-4 w-4 text-gray-400 hover:text-gray-500"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          {/if}
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
            applyPrompt(promptPreview);
            close();
          }}
          type="submit"
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
