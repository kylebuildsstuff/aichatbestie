<script>
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';

  import { onClickOutside } from '$lib/shared/shared-utils';
  import XIcon from '$lib/shared/icons/x-icon.svelte';

  import SidebarBody from './sidebar-body.svelte';
  import SidebarFooter from './sidebar-footer.svelte';

  let { isMobileSidebarOpen$, handleCloseMobileSidebar } = getContext('sidebar');
</script>

{#if $isMobileSidebarOpen$}
  <div
    transition:slide
    class={`fixed inset-0 flex z-40 md:hidden`}
    role="dialog"
    aria-modal="true"
  >
    <!-- Off-canvas menu overlay, show/hide based on off-canvas menu state. -->
    <div
      class="fixed inset-0 bg-gray-400 bg-opacity-75"
      aria-hidden="true"
    />
    <!-- Off-canvas menu, show/hide based on off-canvas menu state. -->
    <div
      use:onClickOutside
      on:clickoutside={handleCloseMobileSidebar}
      class="relative flex-1 flex flex-col max-w-xs w-full bg-white"
    >
      <!-- Close button, show/hide based on off-canvas menu state. -->
      <div class="absolute top-0 right-0 -mr-12 pt-2">
        <button
          type="button"
          class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          on:click={handleCloseMobileSidebar}
        >
          <span class="sr-only">Close sidebar</span>
          <XIcon />
        </button>
      </div>

      <SidebarBody />

      <SidebarFooter />
    </div>
  </div>
{/if}
