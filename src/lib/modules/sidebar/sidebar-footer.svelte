<script lang="ts">
  import { getContext } from 'svelte';

  import { isSignedIn$ } from '$lib/shared/shared.store';
  import UserIcon from '$lib/shared/icons/user-icon.svelte';
  import SparklesIcon from '$lib/shared/icons/sparkles-icon.svelte';
  import DiscordIcon from '$lib/shared/icons/discord-icon.svelte';
  import YoutubeIcon from '$lib/shared/icons/youtube-icon.svelte';
  import TwitterIcon from '$lib/shared/icons/twitter-icon.svelte';
  import EnvelopeIcon from '$lib/shared/icons/envelope-icon.svelte';
  import LinkedinIcon from '$lib/shared/icons/linkedin-icon.svelte';
  import ApiKeyModal from '$lib/shared/components/api-key-modal.svelte';
  import CogIcon from '$lib/shared/icons/cog-icon.svelte';
  import {
    DISCORD_LINK,
    EMAIL_LINK,
    LINKEDIN_LINK,
    PRIVACY_POLICY_LINK,
    TWITTER_LINK,
    YOUTUBE_LINK
  } from '$lib/shared/shared.constant';

  const { handleCloseMobileSidebar } = getContext('sidebar') as any;
  const { open } = getContext('simple-modal') as any;

  const openApiKeyModal = () => {
    open(ApiKeyModal, {});
    handleCloseMobileSidebar();
  };
</script>

<div class="flex flex-col border-t border-gray-500 bg-gray-800">
  <!-- Upgrade -->
  <a
    on:click={handleCloseMobileSidebar}
    href="/plans"
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
  {#if $isSignedIn$}
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
  {/if}

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
<div class="flex flex-col gap-3 py-3 justify-center items-center bg-gray-800">
  <div class="flex flex-row gap-5 justify-center items-center text-gray-400 text-sm">
    <a
      href={DISCORD_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <DiscordIcon />
    </a>
    <a
      href={YOUTUBE_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <YoutubeIcon />
    </a>
    <a
      href={TWITTER_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <TwitterIcon />
    </a>
    <a
      href={LINKEDIN_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkedinIcon />
    </a>
    <a
      href={EMAIL_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="sr-only">Email</span>
      <EnvelopeIcon />
    </a>
  </div>

  <div class="flex gap-1">
    <a
      href={PRIVACY_POLICY_LINK}
      target="_blank"
      class="text-xs text-gray-500 hover:text-gray-300 hover:cursor-pointer"
    >
      Privacy
    </a>
    <span class="text-xs text-gray-500"> · </span>
    <a
      href="/faqs"
      class="text-xs text-gray-500 hover:text-gray-300 hover:cursor-pointer">FAQs</a
    >
    <span class="text-xs text-gray-500"> · </span>
    <span class="text-xs text-gray-500">
      <a
        href="/"
        class="hover:text-gray-300"
      >
        AI Chat Bestie
      </a> © 2023</span
    >
  </div>
</div>
