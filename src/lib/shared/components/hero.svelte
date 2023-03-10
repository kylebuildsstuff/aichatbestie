<script lang="ts">
  import { getContext } from 'svelte';
  import BoltIcon from '../icons/bolt-icon.svelte';
  import CircleStackIcon from '../icons/circle-stack-icon.svelte';
  import GiftIcon from '../icons/gift-icon.svelte';
  import IdentificationIcon from '../icons/identification-icon.svelte';
  import KeyIcon from '../icons/key-icon.svelte';
  import MagnifyingGlassIcon from '../icons/magnifying-glass-icon.svelte';
  import WifiIcon from '../icons/wifi-icon.svelte';
  import { truncateStringInMiddle } from '../shared-utils';
  import { openAiApiKey$ } from '../shared.store';

  import ApiKeyModal from './api-key-modal.svelte';
  import HeroFeature from './hero-feature.svelte';

  const { open } = getContext('simple-modal') as any;

  const features = [
    {
      title: 'Faster responses.',
      description: `Connect directly to the OpenAI API and bypass slow typing animations for quick response times.`,
      icon: BoltIcon
    },
    {
      title: 'Uninterrupted connectivity.',
      description: `Leave your tab open and stay connected forever without having to log back in.`,
      icon: WifiIcon
    },
    {
      title: '24/7 available chat history.',
      description: `All keys and chats are stored locally within your browser, accessible any time.`,
      icon: CircleStackIcon
    },
    {
      title: 'Searchable chat history.',
      description: `Dig up old conversations and find previously lost answers.`,
      icon: MagnifyingGlassIcon
    },
    {
      title: 'No registration required.',
      description: `Storing keys, chats, and sending messages are done directly in the browser with no intermediaries.`,
      icon: IdentificationIcon
    },
    {
      title: 'Free (bring your own key).',
      description: `Access all base features for free. Get your own OpenAI API key for free.`,
      icon: GiftIcon
    }
  ];

  const openApiKeyModal = () => {
    open(ApiKeyModal, {});
  };
</script>

<div class="bg-white py-12">
  <div class="flex flex-col items-center mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mb-8 md:mb-12">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          AI Chat
          <span
            class="inline-block bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text"
          >
            Bestie
          </span>
        </p>
        <p class="mt-3 text-lg leading-8 text-gray-600">
          An enhanced UI wrapper for ChatGPT
        </p>
      </div>

      <!-- Features -->
      <div class="flex justify-center mx-auto mt-12 lg:mt-20 max-w-xl lg:max-w-4xl">
        <dl
          class="mx-auto grid grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
        >
          {#each features as { title, description, icon }}
            <HeroFeature
              {title}
              {description}
            >
              <svelte:fragment slot="icon">
                <svelte:component this={icon} />
              </svelte:fragment>
            </HeroFeature>
          {/each}
        </dl>
      </div>
    </div>

    <!-- API Key -->
    <!-- class="w-60 rounded-md bg-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" -->
    <button
      on:click={openApiKeyModal}
      type="button"
      class="flex justify-center items-center gap-2 lg:mx-0 hover:underline bg-gradient-to-r from-emerald-400 to-cyan-400 text-lg text-white font-bold rounded py-3 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
    >
      <KeyIcon />
      {$openAiApiKey$ ? truncateStringInMiddle($openAiApiKey$) : `Enter API key`}
    </button>
    <!-- Help text to get key -->
    <p class="mt-2 text-sm text-gray-600">
      <a
        href="https://beta.openai.com/docs/developer-quickstart"
        class="text-gray-400 hover:underline hover:text-blue-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get your API key for free from OpenAI
      </a>
    </p>
  </div>
</div>
