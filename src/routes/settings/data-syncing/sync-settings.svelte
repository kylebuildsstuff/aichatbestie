<script lang="ts">
  import { getNotificationsContext } from 'svelte-notifications';

  import { nhost } from '$lib/core/nhost/nhost';
  import { NOTIFICATION_SETTINGS } from '$lib/shared/shared.constant';

  import { SAVE_USER_CHATS } from '$lib/shared/shared.graphql';
  import {
    banners$,
    chatsWithTitles$,
    hasHitSavedChatsLimit$,
    isUpgraded$,
    savedChats$,
    userId$
  } from '$lib/shared/shared.store';
  import { BANNER_TYPE, ERROR, type Banner } from '$lib/shared/shared.type';

  import SavedChat from './saved-chat.svelte';

  const { addNotification } = getNotificationsContext();

  const handleSaveClick = async () => {
    if ($hasHitSavedChatsLimit$) {
      banners$.update((state) => [
        ...state.filter(
          (banner: Banner) => banner.bannerId !== ERROR.DATA_SYNC_SAVE_LIMIT
        ),
        {
          bannerId: ERROR.DATA_SYNC_SAVE_LIMIT,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Max number of saved chats reached',
          description: ''
        }
      ]);
      return;
    }

    const { data, error } = (await nhost.graphql.request(SAVE_USER_CHATS, {
      userId: $userId$,
      chats: $chatsWithTitles$
    })) as any;

    if (!error) {
      const savedChat = data?.insertSavedChatsOne;
      savedChats$.update((state) => [...state, savedChat]);

      addNotification({
        ...NOTIFICATION_SETTINGS,
        text: 'Chats saved'
      });
    } else {
      banners$.update((state) => [
        ...state.filter((banner: Banner) => banner.bannerId !== ERROR.DATA_SYNC_SAVE),
        {
          bannerId: ERROR.DATA_SYNC_SAVE,
          bannerType: BANNER_TYPE.ERROR,
          title: 'An error occurred while saving your chats',
          description: ''
        }
      ]);
    }
  };

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
      disabled={!$isUpgraded$}
      class="inline-flex items-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      class:opacity-50={!$isUpgraded$}
      on:click={handleSaveClick}
    >
      Save
    </button>
  </div>

  <div class="mt-6">
    <!-- Saved chats -->
    {#each $savedChats$ as { id, label, createdAt, updatedAt, chats }, index}
      <SavedChat
        {id}
        {label}
        {createdAt}
        {updatedAt}
        {chats}
      />
    {/each}
  </div>
</div>
