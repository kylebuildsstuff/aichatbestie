<script lang="ts">
  import { getContext } from 'svelte';

  import SparklesIcon from '$lib/shared/icons/sparkles-icon.svelte';
  import { STORYTELLER_PROMPT } from '$lib/shared/shared.constant';

  const { close } = getContext('simple-modal') as any;

  /**
   * https://github.com/f/awesome-chatgpt-prompts
   */

  let voiceId = 'lala';
  const activeVoiceTypeClasses = `ring-1 ring-indigo-500 border-indigo-500 z-10`;

  const PROMPT_OPTIONS = [
    {
      promptId: 'storyteller',
      promptLabel: 'Act as a Storyteller',
      prompt: STORYTELLER_PROMPT,
      characterCount: STORYTELLER_PROMPT.length
    }
  ];

  let voiceOptions = [
    {
      voiceType: 'sad',
      voiceId: 'sad',
      voiceLabel: 'Sad',
      gender: 'Male',
      isChild: false,
      languageCode: 'en-US',
      voiceProvider: 'Google',
      audioSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      isNewscaster: false,
      voiceStyles: [],
      voiceRoles: []
    },
    {
      voiceType: 'happy',
      voiceId: 'happy',
      voiceLabel: 'Happy',
      gender: 'Male',
      isChild: false,
      languageCode: 'en-US',
      voiceProvider: 'Google',
      audioSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      isNewscaster: false,
      voiceStyles: [],
      voiceRoles: []
    }
  ];

  const applyPrompt = () => {};
</script>

<div class="bg-white rounded-lg border-gray-200 divide-y">
  <div class="bg-white px-3 py-2">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Prompts</h3>
  </div>

  <div class="px-4 py-5 sm:p-6 overflow-auto">
    <ul class="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-3 sm:gap-x-4 xl:gap-x-8">
      {#each voiceOptions as { voiceType: vType, voiceId: vId, voiceLabel }}
        {@const isSelected = vId === voiceId}
        {@const accentOrigin = 'Mexico'}
        <li class={`relative flex gap-0.5 items-center`}>
          <div
            on:click={() => {}}
            on:dblclick={applyPrompt}
            on:keydown={() => {}}
            class={`relative w-full hover:cursor-pointer hover:bg-gray-100 rounded p-1 pl-2 ${
              isSelected ? activeVoiceTypeClasses : ''
            }`}
          >
            <p class="mt-2 flex gap-1 items-center text-sm font-medium text-gray-900">
              <!-- Voice name -->
              {voiceLabel}
            </p>
            <p
              class="block text-sm font-medium text-gray-500"
              title="Accent origin"
            >
              {accentOrigin} # characters
            </p>
          </div>
        </li>
      {/each}
    </ul>
  </div>

  <!-- CTAs -->
  <div class="pt-5">
    <div class="flex flex-col items-end justify-end">
      <div class="flex gap-2">
        <button
          on:click={() => {
            close();
          }}
          type="button"
          class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          on:click={() => {
            close();
          }}
          type="button"
          class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply as system message
        </button>
        <button
          on:click={applyPrompt}
          disabled={false}
          class="disabled:opacity-50 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply prompt
        </button>
      </div>
      <span class="flex justify-end mt-1 text-xs text-gray-500">
        Double-clicking the selection also applies the prompt.
      </span>
    </div>
  </div>
</div>
