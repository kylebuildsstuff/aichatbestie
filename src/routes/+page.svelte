<script lang="ts">
  import { onMount } from 'svelte';

  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import Hero from '$lib/shared/components/hero.svelte';
  import Chat from '$lib/modules/chat/chat.svelte';
  import { banners$ } from '$lib/shared/shared.store';

  onMount(() => {
    banners$.update((state) => [
      ...state.filter((banner) => banner.bannerId !== 'sss'),
      {
        bannerId: 'sss',
        title: 'A problem occurred while changing plans',
        description: 'Please refresh the page and try again later, or contact support.'
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
