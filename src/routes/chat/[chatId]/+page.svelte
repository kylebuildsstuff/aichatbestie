<script lang="ts">
  import Chat from '$lib/modules/chat/chat.svelte';
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
</script>

<PageContainer>
  <svelte:fragment slot="page-content">
    <Chat />
  </svelte:fragment>
</PageContainer>
