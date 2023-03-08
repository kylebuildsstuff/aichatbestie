<script lang="ts">
  import { onMount, getContext } from 'svelte';
  import { getNotificationsContext } from 'svelte-notifications';
  import { NOTIFICATION_SETTINGS } from '../shared.constant';

  import { LOCAL_STORAGE_KEY } from '../shared.type';

  const { close } = getContext('simple-modal') as any;
  const { addNotification } = getNotificationsContext();

  let openAiKey = '';

  onMount(() => {
    openAiKey = localStorage.getItem(LOCAL_STORAGE_KEY.OPEN_AI_API_KEY) || '';
  });

  const closeModal = () => {
    close();
  };

  const setApiKey = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY.OPEN_AI_API_KEY, openAiKey);

    addNotification({
      ...NOTIFICATION_SETTINGS,
      text: 'API key set'
    });
    closeModal();
  };
</script>

<div class="bg-white rounded-lg border-gray-200 divide-y">
  <div class="bg-white px-3 py-2">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Set OpenAI API key</h3>
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
      bind:value={openAiKey}
      id="open-ai-key"
      name="open-ai-key"
      type="text"
      placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      class={`block w-full text-sm mt-1 pl-3 pr-10 py-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 flex-1`}
    />
  </div>

  <div class="pt-5">
    <div class="flex justify-end">
      <button
        on:click={closeModal}
        type="button"
        class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
      <button
        on:click={setApiKey}
        class="ml-3 disabled:opacity-50 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </div>
</div>
