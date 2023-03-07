<script lang="ts">
  import SidebarBody from './sidebar-body.svelte';
  import SidebarFooter from './sidebar-footer.svelte';

  export let handleCloseMobileSidebar = () => {};
</script>

<div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
  <!-- Sidebar component, swap this element with another sidebar if you like -->
  <div class="flex flex-1 flex-col min-h-0 border-r border-gray-200 bg-white">
    <SidebarBody {handleCloseMobileSidebar} />

    <SidebarFooter {handleCloseMobileSidebar} />
  </div>
</div>
