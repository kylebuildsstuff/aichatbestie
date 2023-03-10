<script lang="ts">
  import { getContext } from 'svelte';
  import BoltIcon from '../icons/bolt-icon.svelte';
  import CircleStackIcon from '../icons/circle-stack-icon.svelte';
  import GiftIcon from '../icons/gift-icon.svelte';
  import IdentificationIcon from '../icons/identification-icon.svelte';
  import MagnifyingGlassIcon from '../icons/magnifying-glass-icon.svelte';
  import WifiIcon from '../icons/wifi-icon.svelte';
  import XMarkIcon from '../icons/x-mark-icon.svelte';
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

<div class="bg-white sm:py-24">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        AI Chat
        <span
          class="inline-block bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text"
        >
          Bestie
        </span>
      </p>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        An enhanced UI wrapper for ChatGPT
      </p>
    </div>

    <!-- Features -->
    <div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
      <dl
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
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

      <button
        on:click={openApiKeyModal}
        type="button"
        class="rounded-full bg-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {$openAiApiKey$ ? truncateStringInMiddle($openAiApiKey$) : `Enter API key`}
      </button>
    </div>
  </div>
</div>
