<script lang="ts">
  import ExclamationCircle from '$lib/shared/icons/exclamation-circle.svelte';
  import XMarkIcon from '$lib/shared/icons/x-mark-icon.svelte';
  import { banners$ } from '$lib/shared/shared.store';
  import { BANNER_TYPE } from '$lib/shared/shared.type';

  export let bannerId = '';
  export let bannerType = BANNER_TYPE.WARNING;
  export let title = '';
  export let description = '';

  const bgColor = {
    [BANNER_TYPE.WARNING]: 'bg-yellow-50',
    [BANNER_TYPE.ERROR]: 'bg-red-50',
    [BANNER_TYPE.SUCCESS]: 'bg-green-50'
  };

  const titleColor = {
    [BANNER_TYPE.WARNING]: 'text-yellow-800',
    [BANNER_TYPE.ERROR]: 'text-red-800',
    [BANNER_TYPE.SUCCESS]: 'text-green-800'
  };

  const descriptionColor = {
    [BANNER_TYPE.WARNING]: 'text-yellow-700',
    [BANNER_TYPE.ERROR]: 'text-red-700',
    [BANNER_TYPE.SUCCESS]: 'text-green-700'
  };

  const iconTextColor = {
    [BANNER_TYPE.WARNING]: 'text-yellow-400',
    [BANNER_TYPE.ERROR]: 'text-red-400',
    [BANNER_TYPE.SUCCESS]: 'text-green-400'
  };

  const hoverBgColor = {
    [BANNER_TYPE.WARNING]: 'hover:bg-yellow-100',
    [BANNER_TYPE.ERROR]: 'hover:bg-red-100',
    [BANNER_TYPE.SUCCESS]: 'hover:bg-green-100'
  };

  const handleDismissClick = () => {
    banners$.update((banners) =>
      banners.filter((banner: any) => banner.bannerId !== bannerId)
    );
  };
</script>

<div class={`w-full rounded-md ${bgColor[bannerType]} p-4 my-2`}>
  <div class="flex">
    <div class="flex-shrink-0">
      <ExclamationCircle overrideClasses={`w-6 h-6 ${iconTextColor[bannerType]}`} />
    </div>
    <div class="ml-3">
      {#if title}
        <h3 class={`text-sm font-medium ${titleColor[bannerType]}`}>{title}</h3>
      {/if}
      {#if description}
        <div class={`mt-2 text-sm ${descriptionColor[bannerType]}`}>
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
          class={`inline-flex ${bgColor[bannerType]} rounded-md p-1.5 ${iconTextColor[bannerType]} hover:${hoverBgColor[bannerType]} focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          <span class="sr-only">Dismiss</span>
          <XMarkIcon />
        </button>
      </div>
    </div>
  </div>
</div>
