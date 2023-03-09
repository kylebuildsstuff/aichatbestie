<script lang="ts">
  import { nanoid } from 'nanoid';
  import { tick } from 'svelte';
  import { browser } from '$app/environment';

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
  import {
    LOCAL_STORAGE_KEY,
    MESSAGE_ROLE,
    type Message
  } from '$lib/shared/shared.type';
  import {
    CHAT_LABELLING_PROMPT,
    DEFAULT_SYSTEM_MESSAGE_CONTENT
  } from '$lib/shared/shared.constant';

  import ChatMessage from './chat-message.svelte';
  import { afterNavigate } from '$app/navigation';
  import ArrowPathIcon from '$lib/shared/icons/arrow-path-icon.svelte';

  export let chatId = '';

  let inputMessage = '';
  let messages =
    chatId && $chats$?.[chatId] ? $chats$?.[chatId]?.messages : ([] as any);

  $: {
    console.log('messages: ', messages);
  }

  let textareaRef;
  let isLoading = false;

  $: textareaRows = (inputMessage.match(/\n/g) || []).length + 1 || 1;
  $: enableRegenerateMessage = !isLoading && inputMessage.length > 2;

  afterNavigate(async () => {
    if (browser) {
      // The tick is needed for some reason, if not here then below
      await tick();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  });

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
    const newChatId = nanoid(8);
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
  const updateChat = (id, msgs) => {
    chats$.update((chats) => {
      chats[id].messages = msgs;
      return chats;
    });
    localStorage.setItem(id, JSON.stringify($chats$[id]));
  };

  const upsertChat = (
    chatId: string,
    msgs: Message[],
    systemMessageContent: string
  ) => {
    if (!chatId) {
      handleCreateNewChat(msgs, systemMessageContent);
    } else {
      updateChat(chatId, msgs);
    }
  };

  /**
   * Chat title completion
   */
  const chatTitleCompletion = async (msgs) => {
    const title = await chatCompletion(
      CHAT_LABELLING_PROMPT,
      msgs,
      $openAiApiKey$
    ).then((res) =>
      res
        .map((r) => r.content)
        .map((r) => r.replace('Title:', ''))
        .map((r) => r.trim())
        .join('')
    );

    return title;
  };

  /**
   * Chat completion
   */
  const handleChatCompletion = async () => {
    isLoading = true;
    // Means only system message is present
    let requiresChatTitle = !messages?.length || messages?.length === 1;
    const _inputMessage = inputMessage;
    inputMessage = '';

    const userMessage = {
      role: MESSAGE_ROLE.USER,
      content: _inputMessage
    };

    messages = messages.concat([userMessage]);
    upsertChat(chatId, messages, DEFAULT_SYSTEM_MESSAGE_CONTENT);

    if (browser) {
      await tick();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }

    const response = await chatCompletion(_inputMessage, messages, $openAiApiKey$);

    messages = messages.concat(response);
    upsertChat(chatId, messages, DEFAULT_SYSTEM_MESSAGE_CONTENT);
    isLoading = false;

    // Create and set title for chat
    if (requiresChatTitle) {
      const title = await chatTitleCompletion(messages.slice(0, 2));

      // Update ChatList with title
      chatList$.update((chatList) => {
        chatList = chatList.map((chat) => {
          if (chat.chatId === chatId) {
            chat.title = title;
          }
          return chat;
        });
        return chatList;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
    }

    if (browser) {
      await tick();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }

    return response;
  };
</script>

<section class="relative flex flex-col justify-center items-center">
  <!-- Messages -->
  <div class="w-full pb-16 mb-16 ">
    <ul class="divide-y divide-gray-200 mb-8">
      {#if messages.length > 0}
        {#each messages?.filter?.(isNotSystemMessage) as { role, content }}
          <div class:bg-gray-100={role === 'assistant'}>
            <ChatMessage
              {role}
              {content}
            />
          </div>
        {/each}
      {/if}
    </ul>
    <div class="absolute bottom-0 bg-white py-20 " />
  </div>

  <!-- Chat input -->
  <div
    class="w-full fixed bottom-0 mt-4 py-10 z-10 bg-gradient-to-b from-transparent via-white to-white"
  >
    <form class="w-full flex flex-col gap-2">
      <!-- Loading text -->
      {#if isLoading}
        <div class="flex self-center items-center text-gray-500 text-sm">
          <div class="inset-y-0 left-0 pl-2">
            <LoadingButtonSpinnerIcon />
          </div>

          <div>Bestie is thinking...</div>
        </div>
      {/if}

      {#if true}
        <button
          type="button"
          class="flex justify-center items-center gap-2 w-48 self-center whitespace-nowrap rounded-md mb-1 bg-white py-2 px-3 text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <ArrowPathIcon />
          Regenerate response
        </button>
      {/if}

      <!-- Input -->
      <div class="flex gap-2 justify-center items-center">
        <div
          class="relative w-full flex justify-center items-center max-w-md lg:max-w-2xl xl:max-w-4xl"
        >
          <textarea
            bind:this={textareaRef}
            bind:value={inputMessage}
            use:resizeTextarea
            on:resize={handleTextareaResize}
            rows={textareaRows}
            class="w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow drop-shadow shado ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-y-auto"
            on:keydown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleChatCompletion();
              }
            }}
          />

          <!-- Send button -->
          <button
            on:click={handleChatCompletion}
            type="submit"
            id="thisone"
            class="absolute right-0 inset-y-0 py-2 pr-3"
          >
            <PaperAirplane />
          </button>
        </div>
      </div>

      <div class="text-xs text-center text-gray-400">
        AI Chat Bestie - an enhanced UI wrapper for ChatGPT
      </div>
    </form>
  </div>
</section>
