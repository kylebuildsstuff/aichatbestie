<script lang="ts">
  import { getNotificationsContext } from 'svelte-notifications';
  import { onMount } from 'svelte';

  import { nhost } from '$lib/core/nhost/nhost';
  import { NOTIFICATION_SETTINGS } from '$lib/shared/shared.constant';

  import { SAVE_USER_CHATS } from '$lib/shared/shared.graphql';
  import {
    banners$,
    chatsWithTitles$,
    savedChats$,
    userId$
  } from '$lib/shared/shared.store';
  import { BANNER_TYPE, ERROR, type Banner } from '$lib/shared/shared.type';

  const { addNotification } = getNotificationsContext();

  const handleSaveClick = async () => {
    const { error } = (await nhost.graphql.request(SAVE_USER_CHATS, {
      userId: $userId$,
      chats: $chatsWithTitles$
    })) as any;

    if (!error) {
      addNotification({
        ...NOTIFICATION_SETTINGS,
        text: 'Chats saved'
      });
    } else {
      banners$.update((state) => [
        ...state.filter((banner: Banner) => banner.bannerId !== ERROR.DATA_SYNC_SAVE),
        {
          bannerId: ERROR.DATA_SYNC_IMPORT,
          bannerType: BANNER_TYPE.ERROR,
          title: 'An error occurred while saving your chats',
          description: ''
        }
      ]);
    }
  };

  const handleImportClick = async () => {};

  // addNotification({
  //   ...NOTIFICATION_SETTINGS,
  //   text: 'Signed out'
  // });
</script>

<div class="divide-y divide-gray-200">
  <!-- Section header -->
  <div class="flex items-start justify-between space-y-1">
    <div class="flex flex-col flex-start gap-2">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Chat syncing</h3>
      <p class="max-w-2xl text-sm text-gray-500">
        Saving chats will save your chats to your account. Importing saved chats will
        overwrite your current chat history in the browser.
      </p>
    </div>

    <button
      type="button"
      class="inline-flex items-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      on:click={handleSaveClick}
    >
      Save
    </button>
  </div>

  <div class="mt-6">
    <!-- Saved chats -->
    <dl class="divide-y divide-gray-200">
      <div class="flex items-center justify-between py-4 sm:py-5">
        <dt class="text-sm font-medium text-gray-500">Chat history</dt>

        <dd class="flex gap-2 text-sm text-gray-900">
          <button
            type="button"
            class="inline-flex items-center bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click={handleImportClick}
          >
            Import
          </button>
        </dd>
      </div>
    </dl>
  </div>
</div>
