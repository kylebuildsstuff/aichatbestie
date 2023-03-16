<script lang="ts">
  import { getContext } from 'svelte';
  import { getNotificationsContext } from 'svelte-notifications';

  import { HOW_TO_GET_API_KEY_LINK, NOTIFICATION_SETTINGS } from '../shared.constant';
  import { banners$, openAiApiKey$ } from '../shared.store';
  import { autofocus, chatCompletion } from '../shared-utils';

  import { BANNER_TYPE, ERROR, LOCAL_STORAGE_KEY } from '../shared.type';

  const { close } = getContext('simple-modal') as any;
  const { addNotification } = getNotificationsContext();

  let openAiApiKey = $openAiApiKey$;
  let errorMessage = '';

  const closeModal = () => {
    close();
  };

  const setApiKey = async () => {
    if (openAiApiKey) {
      const { error } = await chatCompletion('Hi', [], openAiApiKey);

      if (error) {
        errorMessage =
          error?.message || error?.name || error?.code || 'Connection to OpenAI failed';
        return;
      }
    }

    openAiApiKey$.set(openAiApiKey);

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.OPEN_AI_API_KEY, openAiApiKey);
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
      closeModal();
      return;
    }

    addNotification({
      ...NOTIFICATION_SETTINGS,
      text: 'API key set'
    });
    closeModal();
  };
</script>

<div class="bg-white rounded-lg border-gray-200 divide-y">
  <div class="bg-white px-3 py-2">
    <h3 class="text-lg leading-6 font-medium text-gray-900">OpenAI API key</h3>
  </div>

  <div class="px-4 py-5 sm:p-6">
    <!-- API key -->
    <label
      for="name"
      class="block text-sm font-medium text-gray-700"
    >
      API key
    </label>
    <input
      bind:value={openAiApiKey}
      use:autofocus
      id="open-ai-key"
      name="open-ai-key"
      type="text"
      placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      class={`block w-full text-sm mt-1 pl-3 pr-10 py-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 flex-1`}
    />
    {#if errorMessage}
      <p class="mt-2 text-sm text-red-600">{errorMessage}</p>
    {/if}

    <p class="mt-1 text-sm text-gray-400">
      Your API Key will be stored locally on your browser.
      <a
        href={HOW_TO_GET_API_KEY_LINK}
        class="text-blue-400 hover:underline hover:text-blue-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get your API key for free from OpenAI.
      </a>
    </p>
  </div>

  <div class="pt-5">
    <div class="flex gap-2 justify-end">
      <button
        on:click={closeModal}
        type="button"
        class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
      <button
        on:click={setApiKey}
        class="disabled:opacity-50 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </div>
</div>
