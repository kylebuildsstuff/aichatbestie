<script lang="ts">
  import { getContext } from 'svelte';
  import { browser } from '$app/environment';

  import { MODEL_OPTIONS, PROMPT_OPTIONS } from '$lib/shared/shared.constant';
  import { banners$, savedPrompts$ } from '$lib/shared/shared.store';
  import { LOCAL_STORAGE_KEY, type GPT_MODEL } from '$lib/shared/shared.type';

  const { close } = getContext('simple-modal') as any;

  let modelId;

  const selectModel = (model: GPT_MODEL) => {
    modelId = model;
  };

  const applyModel = (model: GPT_MODEL) => {
    if (browser && model) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY.GPT_MODEL, model);
      } catch (error) {
        console.error(error);
      }
    }
  };
</script>

<div class="bg-white rounded-lg border-gray-200 divide-y">
  <div class="bg-white px-3 py-2">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Model settings</h3>
  </div>

  <!-- Model options -->
  <div class="grid grid-cols-1 gap-x-2 gap-y-8 px-4 py-5 sm:p-6 overflow-auto">
    <ul
      class="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-4 xl:gap-x-8"
    >
      <!-- Prompt options -->
      {#each Object.values(MODEL_OPTIONS) as { model, label, description, maxTokens, trainingData }}
        {@const isSelected = modelId === model}
        <li class={`relative flex gap-0.5 items-center`}>
          <button
            on:click={() => selectModel(model)}
            on:dblclick={() => {
              applyModel(model);
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
            </p>

            <p
              class="block uppercase text-left text-xs font-medium text-gray-500"
              title="Character count"
            >
              {maxTokens} max tokens
            </p>

            <p
              class="block uppercase text-left text-xs font-medium text-gray-500"
              title="Character count"
            >
              Training data up to {trainingData}
            </p>

            <p
              class="prose block text-left text-sm font-light text-gray-500"
              title="Character count"
            >
              {description}
            </p>
          </button>
        </li>
      {/each}
    </ul>
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
            applyModel(modelId);
            close();
          }}
          type="submit"
          class="disabled:opacity-50 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply model
        </button>
      </div>
      <span class="flex justify-end mt-1 text-xs text-gray-500">
        Double-clicking the selection also applies the model.
      </span>
    </div>
  </div>
</div>
