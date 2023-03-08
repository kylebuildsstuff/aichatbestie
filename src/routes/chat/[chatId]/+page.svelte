<script lang="ts">
  import Chat from '$lib/modules/chat/chat.svelte';
  import PageContainer from '$lib/modules/page-container/page-container.svelte';

  export let data;
</script>

<PageContainer chatId={data.chatId}>
  <svelte:fragment slot="page-content">
    {#key data.chatId}
      <Chat chatId={data.chatId} />
    {/key}
  </svelte:fragment>
</PageContainer>
