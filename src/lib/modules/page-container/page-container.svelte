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

<section class="mb-4">
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <MobileSidebar />

  <!-- Static sidebar for desktop -->
  <Sidebar />
</section>

<!-- Content  -->
<!-- <main class="min-h-[70vh] overflow-scroll"> -->
<main class="relative w-full h-full md:pl-64">
  <MobileHamburger />
  <div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
    <Banners />
    <slot name="page-content" />
  </div>
</main>
