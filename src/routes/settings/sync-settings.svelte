<script lang="ts">
  import { getContext } from 'svelte';
  import { getNotificationsContext } from 'svelte-notifications';

  import { nhost } from '$lib/core/nhost/nhost';
  import { clearUserData } from '$lib/shared/shared-utils';
  import { goto } from '$app/navigation';
  import { NOTIFICATION_SETTINGS } from '$lib/shared/shared.constant';

  import ChangePasswordModal from './change-password-modal.svelte';

  const { open } = getContext('simple-modal') as any;
  const { addNotification } = getNotificationsContext();

  const handleSaveClick = async () => {};

  const handleImportClick = async () => {};

  // addNotification({
  //   ...NOTIFICATION_SETTINGS,
  //   text: 'Signed out'
  // });
</script>

<div class="divide-y divide-gray-200">
  <!-- Section header -->
  <div class="flex flex-col justify-start space-y-1">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Data syncing</h3>
    <p class="max-w-2xl text-sm text-gray-500">
      Importing saved chats will overwrite your current chat history.
    </p>
  </div>

  <div class="mt-6">
    <!-- Password -->
    <dl class="divide-y divide-gray-200">
      <div class="flex items-center justify-between py-4 sm:py-5">
        <dt class="text-sm font-medium text-gray-500">Chat history</dt>

        <dd class="flex gap-2 text-sm text-gray-900">
          <button
            type="button"
            class="inline-flex items-center bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click={handleSaveClick}
          >
            Save
          </button>

          <button
            type="button"
            class="inline-flex items-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click={handleImportClick}
          >
            Import
          </button>
        </dd>
      </div>
    </dl>
  </div>
</div>
