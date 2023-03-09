<script lang="ts">
  import { onDestroy } from 'svelte';
  import { banners$, hasBanners$ } from '$lib/shared/shared.store';

  import Banner from './banner.svelte';

  onDestroy(() => {});
</script>

{#if $hasBanners$}
  <div class="my-4">
    {#each $banners$ as { bannerId, title, description }}
      <Banner
        {bannerId}
        {title}
        {description}
      />
    {/each}
  </div>
{/if}
