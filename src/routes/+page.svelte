<script lang="ts">
  import { onMount } from 'svelte';

  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import Hero from '$lib/shared/components/hero.svelte';
  import ChatMessage from './chat-message.svelte';

  let messages = [] as any;
  let inputMessage = '';

  onMount(async () => {
    await handleChatCompletion();
  });

  const handleChatCompletion = async () => {
    const userMessage = {
      role: 'user',
      content: inputMessage
    };

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isInitializing: messages.length === 0,
        priorMessages: messages,
        message: inputMessage
      })
    }).then((res) => res.json());

    if (inputMessage) {
      messages = messages.concat([userMessage]);
    }

    messages = messages.concat(response);
    inputMessage = '';

    return response;
  };
</script>

<PageContainer>
  <svelte:fragment slot="page-content">
    <Hero />

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

    <form class="mt-4">
      <div class="relative mt-1 flex items-center">
        <input
          bind:value={inputMessage}
          type="text"
          name="search"
          id="search"
          class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          on:click={handleChatCompletion}
          type="submit"
          class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5"
        >
          <kbd
            class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400"
            >Enter</kbd
          >
        </button>
      </div>
    </form>
  </svelte:fragment>
</PageContainer>
