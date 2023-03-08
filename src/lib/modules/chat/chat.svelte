<script lang="ts">
  import { nanoid } from 'nanoid';

  import LoadingButtonSpinnerIcon from '$lib/shared/icons/loading-button-spinner-icon.svelte';
  import PaperAirplane from '$lib/shared/icons/paper-airplane.svelte';
  import {
    chatCompletion,
    createNewChat,
    createNewChatListItem,
    isNotSystemMessage,
    resizeTextarea
  } from '$lib/shared/shared-utils';
  import { chatList$, chats$, openAiApiKey$ } from '$lib/shared/shared.store';
  import { LOCAL_STORAGE_KEY, MESSAGE_ROLE } from '$lib/shared/shared.type';
  import { DEFAULT_SYSTEM_MESSAGE_CONTENT } from '$lib/shared/shared.constant';

  import ChatMessage from './chat-message.svelte';

  export let chatId = '';

  let inputMessage = '';
  let messages =
    chatId && $chats$?.[chatId]
      ? $chats$?.[chatId]?.messages?.filter?.(isNotSystemMessage)
      : ([] as any);

  $: {
    console.log('messages: ', messages);
  }

  let textareaRef;
  let isLoading = false;

  $: textareaRows = (inputMessage.match(/\n/g) || []).length + 1 || 1;

  /**
   * Resize textarea
   */
  const handleTextareaResize = (e) => {
    textareaRef = e.target;
  };

  /**
   * Create new chat
   */
  const handleCreateNewChat = (msgs, systemMessage) => {
    // https://zelark.github.io/nano-id-cc/
    const newChatId = nanoid(5);
    chatId = newChatId;

    chatList$.update((chatList) => {
      chatList.unshift(createNewChatListItem(newChatId));
      return chatList;
    });
    chats$.update((chats) => {
      chats[newChatId] = createNewChat(newChatId, {
        systemMessage,
        messages: msgs
      });
      return chats;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
    localStorage.setItem(newChatId, JSON.stringify($chats$[newChatId]));
  };

  /**
   * Update chat
   */
  const updateChat = (id, messages) => {
    chats$.update((chats) => {
      chats[id].messages = messages;
      return chats;
    });
    localStorage.setItem(id, JSON.stringify($chats$[id]));
  };

  /**
   * Chat completion
   */
  const handleChatCompletion = async () => {
    isLoading = true;
    const _inputMessage = inputMessage;
    inputMessage = '';

    const userMessage = {
      role: MESSAGE_ROLE.USER,
      content: _inputMessage
    };

    const response = await chatCompletion(_inputMessage, messages, $openAiApiKey$);

    messages = messages.concat([userMessage]).concat(response);

    if (!chatId) {
      handleCreateNewChat(messages, DEFAULT_SYSTEM_MESSAGE_CONTENT);
    } else {
      updateChat(chatId, messages);
    }

    isLoading = false;

    return response;
  };
</script>

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
