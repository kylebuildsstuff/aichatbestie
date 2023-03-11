<script lang="ts">
  import { marked } from 'marked';
  import {
    LOGO_THUMBNAIL_CDN_LINK_BG,
    USER_ICON_THUMBNAIL_BG_CDN_LINK
  } from '$lib/shared/shared.constant';
  import { MESSAGE_ROLE } from '$lib/shared/shared.type';

  export let role = '';
  export let content = '';

  $: isUserRole = role === MESSAGE_ROLE.USER;
</script>

<li class="w-full mx-auto flex py-6 max-w-md lg:max-w-2xl xl:max-w-4xl">
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
</li>

<style>
  :global(pre) {
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>
