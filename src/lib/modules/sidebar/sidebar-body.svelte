<script lang="ts">
  import { goto } from '$app/navigation';

  export let isMobile = false;
  export let handleCloseMobileSidebar = () => {};

  const sidebarLinkIconClasses = `text-gray-400 group-hover:text-gray-500 ${
    isMobile ? 'mr-4' : 'mr-3'
  } flex-shrink-0 h-6 w-6`;
  const sidebarLinkTextClasses = `text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-${
    isMobile ? 'base' : 'sm'
  } font-medium rounded-md`;
</script>

<div class="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
  <div class="flex items-center flex-shrink-0 px-4">
    <button on:click={() => goto('/')}>
      <img
        class="h-16 w-auto cursor-pointer"
        src="https://keylayapps.nyc3.cdn.digitaloceanspaces.com/copybuddy/copybuddy-logo-circle.svg"
        alt="AI Chat Bestie"
      />
    </button>
  </div>

  <nav class="mt-5 flex-1 px-2 bg-white space-y-1">
    <a
      on:click={handleCloseMobileSidebar}
      href="/templates"
      class={sidebarLinkTextClasses}
    >
      <!-- Heroicon name: outline/folder -->
      <svg
        class={sidebarLinkIconClasses}
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
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Templates
    </a>

    <a
      on:click={handleCloseMobileSidebar}
      href="/documents"
      class={sidebarLinkTextClasses}
    >
      <!-- Heroicon name: outline/inbox -->
      <svg
        class={sidebarLinkIconClasses}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      Documents
    </a>

    <a
      on:click={handleCloseMobileSidebar}
      href="/saved-content"
      class={sidebarLinkTextClasses}
    >
      <!-- Heroicon name: outline/heart -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class={sidebarLinkIconClasses}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      Saved content
    </a>
  </nav>
</div>
