<script lang="ts">
  import DiscordIcon from '$lib/shared/icons/discord-icon.svelte';
  import TwitterIcon from '$lib/shared/icons/twitter-icon.svelte';
  import {
    DISCORD_LINK,
    GITHUB_LINK,
    PRIVACY_POLICY_LINK,
    TWITTER_LINK
  } from '$lib/shared/shared.constant';
  import GithubIcon from '$lib/shared/icons/github-icon.svelte';
</script>

<div class="flex flex-col border-t border-gray-500 bg-gray-800" />

<!-- Socials & terms -->
<div class="flex flex-col gap-3 py-3 justify-center items-center bg-gray-800">
  <div class="flex flex-row gap-5 justify-center items-center text-gray-400 text-sm">
    <a
      href={TWITTER_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <TwitterIcon />
    </a>
    <a
      href={DISCORD_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <DiscordIcon />
    </a>
    <a
      href={GITHUB_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="sr-only">Github</span>
      <GithubIcon />
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
