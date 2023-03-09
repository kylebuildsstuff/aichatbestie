<script lang="ts">
  export let role = '';
  export let content = '';

  const imgSrc = role === 'assistant' ? '/alfred-headshot.png' : '/batman-headshot.png';
  const name = role === 'assistant' ? 'Alfred' : 'Batman';
</script>

<li class="w-full mx-auto flex py-4 max-w-md lg:max-w-2xl xl:max-w-4xl">
  <img
    class="h-10 w-10 rounded-full"
    src={imgSrc}
    alt=""
  />
  <div class="ml-3">
    <p class="text-sm font-medium text-gray-900">{name}</p>
    <p class="text-sm text-gray-500 whitespace-pre-line">
      {content}
    </p>
  </div>
</li>
