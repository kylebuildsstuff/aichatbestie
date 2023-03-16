<script lang="ts">
  import { getContext } from 'svelte';
  import { getNotificationsContext } from 'svelte-notifications';

  import PageContainer from '$lib/modules/page-container/page-container.svelte';

  import ProfileSettings from './profile-settings.svelte';

  const { open } = getContext('simple-modal') as any;
  const { addNotification } = getNotificationsContext();
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
      <ProfileSettings />
    </div>
  </svelte:fragment>
</PageContainer>
