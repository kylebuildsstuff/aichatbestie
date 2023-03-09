<script lang="ts">
  import ExclamationCircle from '$lib/shared/icons/exclamation-circle.svelte';
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

<div class="w-full rounded-md bg-yellow-50 p-4 my-2">
  <div class="flex">
    <div class="flex-shrink-0">
      <ExclamationCircle overrideClasses={`w-6 h-6 text-yellow-400`} />
    </div>
    <div class="ml-3">
      {#if title}
        <h3 class="text-sm font-medium text-yellow-800">{title}</h3>
      {/if}
      {#if description}
        <div class="mt-2 text-sm text-yellow-700">
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
          class="inline-flex bg-yellow-50 rounded-md p-1.5 text-yellow-400 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
        >
          <span class="sr-only">Dismiss</span>
          <XMarkIcon />
        </button>
      </div>
    </div>
  </div>
</div>
