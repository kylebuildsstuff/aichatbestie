<script lang="ts">
  import { marked } from 'marked';
  import {
    LOGO_THUMBNAIL_CDN_LINK_BG,
    USER_ICON_THUMBNAIL_BG_CDN_LINK
  } from '$lib/shared/shared.constant';
  import { MESSAGE_ROLE } from '$lib/shared/shared.type';
  import GitBranchIcon from '$lib/shared/icons/git-branch-icon.svelte';

  export let role = '';
  export let content = '';
  export let handleForkChat;
  export let index;

  let isHovering = false;

  $: isUserRole = role === MESSAGE_ROLE.USER;
</script>

<div
  on:mouseenter={() => (isHovering = true)}
  on:mouseleave={() => (isHovering = false)}
  class:bg-gray-100={role === 'assistant'}
  class="relative"
>
  <li class="w-full relative mx-auto flex py-6 max-w-md lg:max-w-2xl xl:max-w-4xl">
    {#if isUserRole}
      <img
        class="h-10 w-10 rounded-md"
        src={USER_ICON_THUMBNAIL_BG_CDN_LINK}
        alt=""
      />
    {:else}
      <img
        class="h-10 w-10 rounded-md"
        src={LOGO_THUMBNAIL_CDN_LINK_BG}
        alt=""
      />
    {/if}

    <div class="ml-3">
      <p class="prose max-w-max text-sm text-gray-500 w-full">
        {@html marked.parse(content)}
      </p>
    </div>

    {#if isHovering}
      <button
        on:click={() => handleForkChat(index)}
        title="Fork chat"
      >
        <GitBranchIcon
          overrideClasses="absolute top-6 -right-10 w-4 h-4 text-gray-400 hover:text-gray-700 hover:cursor-pointer"
        />
      </button>
    {/if}
  </li>
</div>

<style>
  :global(pre) {
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>
