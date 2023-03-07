<script lang="ts">
  import { onMount } from 'svelte';

  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import Hero from '$lib/shared/components/hero.svelte';
  import LoadingButtonSpinnerIcon from '$lib/shared/icons/loading-button-spinner-icon.svelte';
  import PaperAirplane from '$lib/shared/icons/paper-airplane.svelte';
  import { chatCompletion, resizeTextarea } from '$lib/shared/shared-utils';

  import ChatMessage from './chat-message.svelte';

  let textareaRef;
  let messages = [] as any;
  let inputMessage = '';

  let isLoading = false;

  $: hasMessages = messages.length > 0;
  $: textareaRows = (inputMessage.match(/\n/g) || []).length + 1 || 1;

  const handleTextareaResize = (e) => {
    textareaRef = e.target;
  };

  const handleChatCompletion = async () => {
    isLoading = true;
    const _inputMessage = inputMessage;
    inputMessage = '';

    const openAiKey = '';
    const userMessage = {
      role: 'user',
      content: _inputMessage
    };

    const response = await chatCompletion(_inputMessage, messages, openAiKey);

    messages = messages.concat([userMessage]).concat(response);
    isLoading = false;

    return response;
  };
</script>

<PageContainer>
  <svelte:fragment slot="page-content">
    {#if !hasMessages}
      <!-- <Hero /> -->
    {/if}

    <ul class="divide-y divide-gray-200">
      {#if messages.length > 0}
        {#each messages as message}
          <ChatMessage
            role={message.role}
            message={message.content}
          />
        {/each}
      {/if}
    </ul>

    <!-- Loading text -->
    {#if isLoading}
      <div class="mt-4 flex justify-start items-center text-center text-gray-500">
        <div class="inset-y-0 left-0 pl-3">
          <LoadingButtonSpinnerIcon />
        </div>

        <div>Bestie is thinking...</div>
      </div>
    {/if}

    <form class="mt-4">
      <div class="relative mt-1 flex items-center">
        <textarea
          bind:this={textareaRef}
          bind:value={inputMessage}
          use:resizeTextarea
          on:resize={handleTextareaResize}
          rows={textareaRows}
          class="block w-full rounded-md  border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-y-auto"
          on:keydown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleChatCompletion();
            }
          }}
        />
        <button
          on:click={handleChatCompletion}
          type="submit"
          class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5"
        >
          <PaperAirplane />
        </button>
      </div>
    </form>
  </svelte:fragment>
</PageContainer>
