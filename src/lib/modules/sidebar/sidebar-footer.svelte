<script lang="ts">
  import { getContext } from 'svelte';

  import CogIcon from '$lib/shared/icons/cog-icon.svelte';

  let { handleCloseMobileSidebar } = getContext('sidebar') as any;
</script>

<div class="flex flex-col border-t border-gray-200">
  <a
    on:click={handleCloseMobileSidebar}
    href="/settings"
    class="w-full p-4 hover:bg-gray-50"
  >
    <div class="flex items-center gap-2 justify-start">
      <CogIcon />

      <div class="flex items-center">
        <p class={`text-base font-medium text-gray-700 group-hover:text-gray-900`}>
          Settings
        </p>
      </div>
    </div>
  </a>

  <a
    on:click={handleCloseMobileSidebar}
    href="/settings"
    class="w-full p-4 hover:bg-gray-50"
  >
    <div class="flex items-center justify-start">
      <CogIcon />

      <div class="flex items-center">
        <p class={`text-base font-medium text-gray-700 group-hover:text-gray-900`}>
          Settings
        </p>
      </div>
    </div>
  </a>
</div>
