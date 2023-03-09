<script lang="ts">
  import { onMount } from 'svelte';

  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import Hero from '$lib/shared/components/hero.svelte';
  import Chat from '$lib/modules/chat/chat.svelte';
  import { banners$ } from '$lib/shared/shared.store';
  import { ERROR } from '$lib/shared/shared.type';

  onMount(() => {
    banners$.update((state) => [
      ...state.filter(
        (banner) => banner.bannerId !== ERROR.LOCAL_STORAGE_STORAGE_LIMIT_REACHED
      ),
      {
        bannerId: ERROR.LOCAL_STORAGE_STORAGE_LIMIT_REACHED,
        title: 'Browser storage running low',
        description:
          'Old chats will be overwritten, please delete unused chats to free up space.'
      }
    ]);
  });
</script>

<PageContainer>
  <svelte:fragment slot="page-content">
    {#if true}
      <Hero />
    {/if}

    <Chat />
  </svelte:fragment>
</PageContainer>
