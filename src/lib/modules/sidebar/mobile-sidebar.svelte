<script>
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';

  import { onClickOutside } from '$lib/shared/shared-utils';

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
      class="fixed inset-0 bg-gray-600 bg-opacity-75"
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
          <!-- Heroicon name: outline/x -->
          <svg
            class="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Static sidebar for mobile (popped out) -->
      <SidebarBody />

      <SidebarFooter />
    </div>
  </div>
{/if}
