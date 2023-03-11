<script lang="ts">
  import { getContext } from 'svelte';
  import { getNotificationsContext } from 'svelte-notifications';

  import PageContainer from '$lib/modules/page-container/page-container.svelte';
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

<PageContainer>
  <!-- Page content -->
  <svelte:fragment slot="page-content">
    <div class="relative flex flex-col  bg-white py-12 max-w-7xl px-6 md:px-16 w-full">
      <!-- Page header -->
      <div class="pb-16">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
      </div>

      <!-- Profile settings (password) -->
      <div class="divide-y divide-gray-200">
        <!-- Section header -->
        <div class="flex items-center justify-between space-y-1">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Profile</h3>

          {#if !isEditing}
            <button
              on:click={handleEditClick}
              type="button"
              class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >Edit</button
            >
          {:else}
            <div class="flex gap-1">
              <button
                on:click={handleCancelEditClick}
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Cancel</button
              >
              <!-- <button
                on:click={handleSaveEditClick}
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Save</button
              > -->
            </div>
          {/if}
        </div>

        <div class="mt-6">
          <!-- DisplayName -->
          <!-- <dl class="divide-y divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
              <dt class="text-sm font-medium text-gray-500">Name</dt>

              {#if !isEditing}
                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span class="flex-grow">{'asdasd'}</span>
                </dd>
              {:else}
                <div class="flex flex-col">
                  <input
                    bind:value={name}
                    type="text"
                    name="name"
                    id="name"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />

                  {#if !name}
                    <p class="mt-2 text-sm text-red-600">Required</p>
                  {/if}
                </div>
              {/if}
            </div>
          </dl> -->

          <!-- Password -->
          <dl class="divide-y divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
              <dt class="text-sm font-medium text-gray-500">Password</dt>
              {#if !isEditing}
                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span class="flex-grow">**********</span>
                </dd>
              {:else}
                <button
                  on:click={handleEditPasswordClick}
                  type="button"
                  class="inline-flex items-center w-fit px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >Change password...</button
                >
              {/if}
            </div>
          </dl>

          <button
            on:click={handleSignout}
            type="button"
            class="mt-1 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  </svelte:fragment>
</PageContainer>
