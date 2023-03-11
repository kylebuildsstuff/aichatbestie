<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Banners from '$lib/modules/banners/banners.svelte';
  import MobileNavbar from '$lib/modules/sidebar/mobile-navbar.svelte';
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
  <aside class="z-20 md:w-64">
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <MobileSidebar />

    <!-- Static sidebar for desktop -->
    <Sidebar />
  </aside>

  <!-- Content  -->
  <section class="w-full">
    <MobileNavbar />
    <!-- Banners -->
    <div class="flex justify-center self-center mx-auto w-3/4">
      <Banners />
    </div>

    <!-- Content -->
    <slot name="page-content" />
  </section>
</main>
