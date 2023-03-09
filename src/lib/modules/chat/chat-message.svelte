<script lang="ts">
  import { marked } from 'marked';

  export let role = '';
  export let content = '';

  const imgSrc = role === 'assistant' ? '/alfred-headshot.png' : '/batman-headshot.png';
</script>

<li class="w-full mx-auto flex py-4 max-w-md lg:max-w-2xl xl:max-w-4xl">
  <img
    class="h-10 w-10 rounded-full"
    src={imgSrc}
    alt=""
  />
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
