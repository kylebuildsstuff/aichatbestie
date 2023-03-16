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

  let isEditing = false;

  const handleEditClick = () => {
    isEditing = true;
  };

  const handleCancelEditClick = () => {
    isEditing = false;
  };

  // const handleSaveEditClick = () => {
  //   isEditing = false;
  // };

  const handleEditPasswordClick = () => {
    open(ChangePasswordModal, {});
  };

  const handleSignout = async () => {
    await nhost.auth.signOut();

    clearUserData();
    addNotification({
      ...NOTIFICATION_SETTINGS,
      text: 'Signed out'
    });
    goto('/');
  };
</script>

<div class="divide-y divide-gray-200">
  <!-- Section header -->
  <div class="flex items-center justify-between space-y-1">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Data syncing</h3>
  </div>

  <div class="mt-6">
    <!-- Password -->
    <dl class="divide-y divide-gray-200">
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
        <dt class="text-sm font-medium text-gray-500">Chat history</dt>

        <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <span class="flex-grow">**********</span>
        </dd>
      </div>
    </dl>
  </div>
</div>
