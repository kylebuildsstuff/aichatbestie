<script lang="ts">
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import Hero from '$lib/shared/components/hero.svelte';
  import Chat from '$lib/modules/chat/chat.svelte';
</script>

<PageContainer>
  <svelte:fragment slot="page-content">
    {#if true}
      <Hero />
    {/if}

    <Chat />
  </svelte:fragment>
</PageContainer>
