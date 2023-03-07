<script lang="ts">
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

<div class="rounded-md bg-red-50 p-4 my-2">
  <div class="flex">
    <div class="flex-shrink-0">
      <!-- Heroicon name: solid/x-circle -->
      <svg
        class="h-5 w-5 text-red-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
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
          <!-- Heroicon name: solid/x -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
