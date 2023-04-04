<script>
  import Notifications from 'svelte-notifications';
  import Modal from 'svelte-simple-modal';

  import Toast from '$lib/modules/toast/toast.svelte';

  import '../app.css';

  let _Toast = Toast;
</script>

<svelte:head>
  <title>Supercharge ChatGPT with our enhanced UI - AI Chat Bestie</title>
  <meta
    name="description"
    content={'Enhanced UI for ChatGPT with faster responses, always available histories, searchable chats, and persistent connectivity. Browser-only storage for privacy and reliability.'}
  />
</svelte:head>

<Notifications item={_Toast}>
  <Modal
    closeButton={true}
    unstyled={false}
    styleWindow={{ width: '90%' }}
  >
    <slot />
  </Modal>
</Notifications>
