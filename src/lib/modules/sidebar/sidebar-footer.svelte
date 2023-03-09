<script lang="ts">
  import { getContext } from 'svelte';

  import KeyIcon from '$lib/shared/icons/key-icon.svelte';
  import UserIcon from '$lib/shared/icons/user-icon.svelte';
  import SparklesIcon from '$lib/shared/icons/sparkles-icon.svelte';

  let { handleCloseMobileSidebar } = getContext('sidebar') as any;
</script>

<div class="flex flex-col border-t border-gray-200 bg-gray-800">
  <!-- Upgrade -->
  <a
    on:click={handleCloseMobileSidebar}
    href="/settings"
    class="w-full p-4 hover:bg-gray-50"
  >
    <div class="flex items-center gap-2 justify-start">
      <SparklesIcon
        overrideClasses={`h-5 w-5 text-gray-400 group-hover:text-gray-500`}
      />

      <div class="flex items-center">
        <p class={`text-base font-medium text-gray-700 group-hover:text-gray-900`}>
          Upgrade
        </p>
      </div>
    </div>
  </a>

  <!-- Join -->
  <a
    on:click={handleCloseMobileSidebar}
    href="/settings"
    class="w-full p-4 hover:bg-gray-50"
  >
    <div class="flex items-center gap-2 justify-start">
      <KeyIcon overrideClasses={`h-5 w-5 text-gray-400 group-hover:text-gray-500`} />

      <div class="flex items-center">
        <p class={`text-base font-medium text-gray-700 group-hover:text-gray-900`}>
          Change API key
        </p>
      </div>
    </div>
  </a>

  <!-- Change API key -->
  <a
    on:click={handleCloseMobileSidebar}
    href="/settings"
    class="w-full p-4 hover:bg-gray-50"
  >
    <div class="flex items-center gap-2 justify-start">
      <UserIcon overrideClasses={`h-5 w-5 text-gray-400 group-hover:text-gray-500`} />

      <div class="flex items-center">
        <p class={`text-base font-medium text-gray-700 group-hover:text-gray-900`}>
          Join <span class="text-gray-400 text-sm">(optional)</span>
        </p>
      </div>
    </div>
  </a>
</div>

<!-- Socials & terms -->
<div class="flex flex-col border-t border-gray-200 bg-gray-800">
  <!-- Upgrade -->
  <a
    on:click={handleCloseMobileSidebar}
    href="/settings"
    class="w-full p-4 hover:bg-gray-50"
  >
    <div class="flex items-center gap-2 justify-start">
      <SparklesIcon
        overrideClasses={`h-5 w-5 text-gray-400 group-hover:text-gray-500`}
      />

      <div class="flex items-center">
        <p class={`text-base font-medium text-gray-700 group-hover:text-gray-900`}>
          Upgrade
        </p>
      </div>
    </div>
  </a>
</div>
