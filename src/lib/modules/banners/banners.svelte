<script lang="ts">
  import { onDestroy } from 'svelte';
  import { banners$, hasBanners$ } from '$lib/shared/shared.store';

  import Banner from './banner.svelte';

  onDestroy(() => {});
</script>

{#if $hasBanners$}
  <div class="my-4">
    {#each $banners$ as { bannerId, bannerType, title, description }}
      <Banner
        {bannerId}
        {bannerType}
        {title}
        {description}
      />
    {/each}
  </div>
{/if}
