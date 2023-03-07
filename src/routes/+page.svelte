<script lang="ts">
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
</script>

<PageContainer>
  <svelte:fragment slot="page-content">
    <span class="bg-red-600 text-2xl"> hello </span>
  </svelte:fragment>
</PageContainer>
