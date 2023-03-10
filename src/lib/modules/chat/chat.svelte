<script lang="ts">
  import { nanoid } from 'nanoid';
  import { tick } from 'svelte';
  import { browser } from '$app/environment';
  import { afterNavigate, goto } from '$app/navigation';

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
  import ArrowPathIcon from '$lib/shared/icons/arrow-path-icon.svelte';
  import PlusIcon from '$lib/shared/icons/plus-icon.svelte';
  import Hero from '$lib/shared/components/hero.svelte';

  import ChatMessage from './chat-message.svelte';

  export let chatId = '';

  let inputMessage = '';
  let messages =
    chatId && $chats$?.[chatId] ? $chats$?.[chatId]?.messages : ([] as any);

  let textareaRef;
  let isLoading = false;

  $: hasMessages = messages.filter(isNotSystemMessage).length > 0;
  $: textareaRows = (inputMessage.match(/\n/g) || []).length + 1 || 1;
  $: enableRegenerateMessage = !isLoading && messages.length > 2;

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
   * Create new chat (and navigate to it)
   */
  const handleCreateNewChat = () => {
    // https://zelark.github.io/nano-id-cc/
    const newChatId = nanoid(5);

    chatList$.update((chatList) => {
      chatList.unshift(createNewChatListItem(newChatId));
      return chatList;
    });
    chats$.update((chats) => {
      chats[newChatId] = createNewChat(newChatId);
      return chats;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
    localStorage.setItem(newChatId, JSON.stringify($chats$[newChatId]));

    goto(`/chat/${newChatId}`);
  };

  /**
   * Insert new chat (For the root route)
   */
  const insertNewChat = (msgs, systemMessage) => {
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
      insertNewChat(msgs, systemMessageContent);
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
   * Regenerate response
   */
  const handleRegenerateResponse = async () => {
    isLoading = true;

    messages = messages.filter((_, i: number) => i !== messages.length - 1);
    const _inputMessage = messages[messages.length - 1].content;

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

    if (browser) {
      await tick();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }

    return response;
  };

  /**
   * Chat completion
   */
  const handleChatCompletion = async () => {
    if (isLoading) {
      return;
    }

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

{#if !hasMessages}
  <Hero />
{/if}

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

      {#if enableRegenerateMessage}
        <button
          on:click={handleRegenerateResponse}
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
            class="absolute right-0 inset-y-0 py-2 pr-3"
          >
            <PaperAirplane />
          </button>
        </div>
        <button
          on:click={handleCreateNewChat}
          type="button"
          title="Create new chat"
        >
          <PlusIcon
            overrideClasses={'text-gray-400 hover:text-gray-500 hover:bg-gray-100 flex-shrink-0 h-6 w-6 rounded-md'}
          />
        </button>
      </div>

      <div class="text-xs text-center text-gray-400">
        <a
          href="/"
          class="hover:font-medium hover:underline hover:text-blue-400"
        >
          AI Chat Bestie
        </a>
        - an enhanced UI wrapper for ChatGPT
      </div>
    </form>
  </div>
</section>
