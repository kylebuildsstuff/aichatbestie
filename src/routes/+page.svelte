<script lang="ts">
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import Chat from '$lib/modules/chat/chat.svelte';
</script>

<PageContainer>
  <svelte:fragment slot="page-content">
    <Chat />
  </svelte:fragment>
</PageContainer>
