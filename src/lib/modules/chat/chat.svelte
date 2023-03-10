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
    isNotSystemMessage
  } from '$lib/shared/shared-utils';
  import { banners$, chatList$, chats$, openAiApiKey$ } from '$lib/shared/shared.store';
  import {
    BANNER_TYPE,
    ERROR,
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

  let isLoading = false;
  let textareaRef;
  let inputMessage = '';
  let messages =
    chatId && $chats$?.[chatId] ? $chats$?.[chatId]?.messages : ([] as any);

  $: hasMessages = messages.filter(isNotSystemMessage).length > 0;
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
  function resizeTextarea(event) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }

  const resetTextareaHeight = () => {
    textareaRef.style.height = 'auto';
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

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
      localStorage.setItem(newChatId, JSON.stringify($chats$[newChatId]));
    } catch (e: any) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.LOCAL_STORAGE_SET_ITEM_FAILED,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Access to browser storage failed',
          description: e?.message || e?.name || ''
        });
        return banners;
      });
    }

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

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
      localStorage.setItem(newChatId, JSON.stringify($chats$[newChatId]));
    } catch (e: any) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.LOCAL_STORAGE_SET_ITEM_FAILED,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Access to browser storage failed',
          description: e?.message || e?.name || ''
        });
        return banners;
      });
    }
  };

  /**
   * Update chat
   */
  const updateChat = (id, msgs) => {
    chats$.update((chats) => {
      chats[id].messages = msgs;
      return chats;
    });
    try {
      localStorage.setItem(id, JSON.stringify($chats$[id]));
    } catch (e: any) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.LOCAL_STORAGE_SET_ITEM_FAILED,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Access to browser storage failed',
          description: e?.message || e?.name || ''
        });
        return banners;
      });
    }
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
    const { data, error } = await chatCompletion(
      CHAT_LABELLING_PROMPT,
      msgs,
      $openAiApiKey$
    );

    if (error) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.OPENAI_CHAT_COMPLETION_FAILED,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Request to OpenAI failed',
          description: error?.message || ''
        });
        return banners;
      });
      return;
    }

    const title = data
      .map((r) => r.content)
      .map((r) => r.replace('Title:', ''))
      .map((r) => r.trim())
      .join('');

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

    const { data, error } = await chatCompletion(
      _inputMessage,
      messages,
      $openAiApiKey$
    );

    if (error) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.OPENAI_CHAT_COMPLETION_FAILED,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Request to OpenAI failed',
          description: error?.message || ''
        });
        return banners;
      });
      isLoading = false;
      if (browser) {
        await tick();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      return;
    }

    messages = messages.concat(data);
    upsertChat(chatId, messages, DEFAULT_SYSTEM_MESSAGE_CONTENT);
    isLoading = false;

    if (browser) {
      await tick();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }

    return;
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
    resetTextareaHeight();

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

    const { data, error } = (await chatCompletion(
      _inputMessage,
      messages,
      $openAiApiKey$
    ).catch((err) => {
      console.error(err);
      return err;
    })) as any;

    if (error) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.OPENAI_CHAT_COMPLETION_FAILED,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Request to OpenAI failed',
          description: error?.message || ''
        });
        return banners;
      });
      isLoading = false;
      if (browser) {
        await tick();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      return;
    }

    messages = messages.concat(data);
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
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
      } catch (e: any) {
        banners$.update((banners) => {
          banners.push({
            id: ERROR.LOCAL_STORAGE_SET_ITEM_FAILED,
            bannerType: BANNER_TYPE.ERROR,
            title: 'Access to browser storage failed',
            description: e?.message || e?.name || ''
          });
          return banners;
        });
      }
    }

    if (browser) {
      await tick();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }

    return;
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
            on:input={resizeTextarea}
            rows={1}
            disabled={!$openAiApiKey$}
            placeholder={$openAiApiKey$ ? '' : 'Please enter your OpenAI API key first'}
            class={`${
              !$openAiApiKey$ ? 'opacity-50' : 'shadow drop-shadow'
            } resize-none w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-y-auto`}
            on:keydown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleChatCompletion();
              }
            }}
          />

          <!-- Send button -->
          {#if $openAiApiKey$}
            <button
              on:click={handleChatCompletion}
              type="submit"
              class="absolute right-0 inset-y-0 py-2 pr-3"
            >
              <PaperAirplane />
            </button>
          {/if}
        </div>

        <!-- New chat -->
        {#if $openAiApiKey$}
          <button
            on:click={handleCreateNewChat}
            type="button"
            title="Create new chat"
          >
            <PlusIcon
              overrideClasses={'text-gray-400 hover:text-gray-500 hover:bg-gray-100 flex-shrink-0 h-6 w-6 rounded-md'}
            />
          </button>
        {/if}
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
