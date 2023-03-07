<script lang="ts">
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import Hero from '$lib/shared/components/hero.svelte';
</script>

<PageContainer>
  <svelte:fragment slot="page-content">
    <Hero />
  </svelte:fragment>
</PageContainer>
