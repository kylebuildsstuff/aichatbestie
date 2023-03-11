<script lang="ts">
  import { getContext } from 'svelte';

  import { isSignedIn$ } from '$lib/shared/shared.store';
  import KeyIcon from '$lib/shared/icons/key-icon.svelte';
  import UserIcon from '$lib/shared/icons/user-icon.svelte';
  import SparklesIcon from '$lib/shared/icons/sparkles-icon.svelte';
  import DiscordIcon from '$lib/shared/icons/discord-icon.svelte';
  import YoutubeIcon from '$lib/shared/icons/youtube-icon.svelte';
  import TwitterIcon from '$lib/shared/icons/twitter-icon.svelte';
  import EnvelopeIcon from '$lib/shared/icons/envelope-icon.svelte';
  import LinkedinIcon from '$lib/shared/icons/linkedin-icon.svelte';
  import ApiKeyModal from '$lib/shared/components/api-key-modal.svelte';
  import CogIcon from '$lib/shared/icons/cog-icon.svelte';
  import { nhost } from '$lib/core/nhost/nhost';
  import { clearUserData } from '$lib/shared/shared-utils';

  const { handleCloseMobileSidebar } = getContext('sidebar') as any;
  const { open } = getContext('simple-modal') as any;

  const openApiKeyModal = () => {
    open(ApiKeyModal, {});
    handleCloseMobileSidebar();
  };

  const handleSignout = async () => {
    await nhost.auth.signOut();

    clearUserData();
  };
</script>

<div class="flex flex-col border-t border-gray-500 bg-gray-800">
  <!-- Upgrade -->
  <a
    on:click={handleCloseMobileSidebar}
    href="/"
    class="w-full p-4 hover:bg-gray-700"
  >
    <div class="flex items-center gap-2 justify-start">
      <SparklesIcon
        overrideClasses={`h-5 w-5 text-gray-400 group-hover:text-gray-500`}
      />

      <div class="flex items-center">
        <p class={`text-gray-300 group-hover:text-gray-900`}>Upgrade</p>
      </div>
    </div>
  </a>

  <!-- Settings -->
  <a
    href="/settings"
    class="w-full p-4 hover:bg-gray-700"
  >
    <div class="flex items-center gap-2 justify-start">
      <CogIcon overrideClasses={`h-5 w-5 text-gray-400 group-hover:text-gray-500`} />

      <div class="flex items-center">
        <p class={`text-gray-300 group-hover:text-gray-900`}>Settings</p>
      </div>
    </div>
  </a>

  <!-- Joins -->
  {#if !$isSignedIn$}
    <a
      href="/register"
      class="w-full p-4 hover:bg-gray-700"
    >
      <div class="flex items-center gap-2 justify-start">
        <UserIcon overrideClasses={`h-5 w-5 text-gray-400 group-hover:text-gray-500`} />

        <div class="flex items-center">
          <p class={`text-gray-300 group-hover:text-gray-900`}>
            Join <span class="text-gray-400 text-sm">(optional)</span>
          </p>
        </div>
      </div>
    </a>
  {/if}
</div>

<!-- Socials & terms -->
<div class="flex flex-col gap-1 py-3 justify-center items-center bg-gray-800">
  <div class="flex flex-row gap-3 justify-center items-center text-gray-400 text-sm">
    <DiscordIcon />
    <YoutubeIcon />
    <TwitterIcon />
    <LinkedinIcon />
    <EnvelopeIcon />
  </div>

  <div class="flex gap-1">
    <span class="text-xs text-gray-500 hover:text-gray-300 hover:cursor-pointer">
      Privacy
    </span>
    <span class="text-xs text-gray-500"> · </span>
    <span class="text-xs text-gray-500 hover:text-gray-300 hover:cursor-pointer"
      >FAQs</span
    >
    <span class="text-xs text-gray-500"> · </span>
    <span class="text-xs text-gray-500"> AI Chat Bestie © 2023</span>
  </div>
</div>
