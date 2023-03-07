<script lang="ts">
  import Banners from '../banners/banners.svelte';
  import MobileHamburger from '../sidebar/mobile-hamburger.svelte';
  import MobileSidebar from '../sidebar/mobile-sidebar.svelte';
  import Sidebar from '../sidebar/sidebar.svelte';

  /**
   * This component exists mainly because +layout.svelte does not support named slots.
   *
   * https://github.com/sveltejs/kit/issues/627
   */
  export let user = {};

  let isMobileSidebarOpen = false;

  const openMobileSidebar = () => {
    isMobileSidebarOpen = true;
  };

  const handleCloseMobileSidebar = () => {
    isMobileSidebarOpen = false;
  };
</script>

<section class="mb-4">
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <MobileSidebar
    {isMobileSidebarOpen}
    {handleCloseMobileSidebar}
  />

  <!-- Static sidebar for desktop -->
  <Sidebar {handleCloseMobileSidebar} />
</section>

<!-- Content  -->
<!-- <main class="min-h-[70vh] overflow-scroll"> -->
<main class="md:pl-64">
  <MobileHamburger {openMobileSidebar} />
  <div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
    <Banners />
    <slot name="page-content" />
  </div>
</main>
