<script>
  import Notifications from 'svelte-notifications';
  import Modal from 'svelte-simple-modal';

  import Toast from '$lib/modules/toast/toast.svelte';

  import '../app.css';

  let _Toast = Toast;
</script>

<svelte:head>
  <title>AI Chat Bestie - Enhanced UI Wrapper for ChatGPT</title>
  <meta
    name="description"
    content={'Enhance your ChatGPT experience with faster response times, customizable prompts, searchable history, and more.'}
  />
</svelte:head>

<Notifications item={_Toast}>
  <Modal
    closeButton={true}
    unstyled={false}
    styleWindow={{ width: '80%' }}
  >
    <slot />
  </Modal>
</Notifications>
