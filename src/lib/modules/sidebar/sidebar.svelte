<script lang="ts">
  import SidebarBody from './sidebar-body.svelte';
  import SidebarFooter from './sidebar-footer.svelte';
</script>

<div class="hidden md:flex md:flex-col md:w-60 md:fixed md:inset-y-0">
  <!-- Sidebar component, swap this element with another sidebar if you like -->
  <div class="flex flex-1 flex-col min-h-0 border-r border-gray-200 bg-white">
    <SidebarBody />

    <SidebarFooter />
  </div>
</div>
