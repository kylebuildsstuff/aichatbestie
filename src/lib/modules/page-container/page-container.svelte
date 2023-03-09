<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Banners from '$lib/modules/banners/banners.svelte';
  import MobileHamburger from '$lib/modules/sidebar/mobile-hamburger.svelte';
  import MobileSidebar from '$lib/modules/sidebar/mobile-sidebar.svelte';
  import Sidebar from '$lib/modules/sidebar/sidebar.svelte';
  /**
   * Workaround to unsupported +layout.svelte named slots.
   *
   * https://github.com/sveltejs/kit/issues/627
   */

  let isMobileSidebarOpen$ = writable(false);

  setContext('sidebar', {
    isMobileSidebarOpen$,
    openMobileSidebar: () => isMobileSidebarOpen$.set(true),
    handleCloseMobileSidebar: () => isMobileSidebarOpen$.set(false)
  });
</script>

<main class="flex flex-1">
  <section class="z-10 md:w-64">
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <MobileSidebar />

    <!-- Static sidebar for desktop -->
    <Sidebar />
  </section>

  <!-- Content  -->
  <section class="w-full">
    <MobileHamburger />
    <Banners />
    <slot name="page-content" />
  </section>
</main>
