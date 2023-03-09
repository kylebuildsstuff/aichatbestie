<script lang="ts">
  import XCircleIcon from '$lib/shared/icons/x-circle-icon.svelte';
  import XMarkIcon from '$lib/shared/icons/x-mark-icon.svelte';
  import { banners$ } from '$lib/shared/shared.store';

  export let bannerId = '';
  export let title = '';
  export let description = '';

  const handleDismissClick = () => {
    banners$.update((banners) =>
      banners.filter((banner: any) => banner.bannerId !== bannerId)
    );
  };
</script>

<div class="w-full rounded-md bg-red-50 p-4 my-2">
  <div class="flex">
    <div class="flex-shrink-0">
      <XCircleIcon />
    </div>
    <div class="ml-3">
      {#if title}
        <h3 class="text-sm font-medium text-red-800">{title}</h3>
      {/if}
      {#if description}
        <div class="mt-2 text-sm text-red-700">
          <p class="space-y-1">
            <span>{description}</span>
          </p>
        </div>
      {/if}
    </div>

    <!-- Dismiss button -->
    <div class="ml-auto pl-">
      <div class="-mx-1.5 -my-1.5">
        <button
          on:click={handleDismissClick}
          type="button"
          class="inline-flex bg-red-50 rounded-md p-1.5 text-red-400 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
        >
          <span class="sr-only">Dismiss</span>
          <XMarkIcon />
        </button>
      </div>
    </div>
  </div>
</div>
