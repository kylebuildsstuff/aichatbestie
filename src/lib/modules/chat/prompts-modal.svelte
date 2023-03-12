<script lang="ts">
  import { getContext } from 'svelte';

  import {
    STORYTELLER_PROMPT,
    CHARACTER_FROM_ANYTHING_PROMPT,
    MIDJOURNEY_PROMPT_GENERATOR_PROMPT,
    POSITION_INTERVIEWER_PROMPT,
    MENTAL_HEALTH_ADVISER_PROMPT,
    RELATIONSHIP_COACH_PROMPT,
    DEBATER_PROMPT,
    MOTIVATIONAL_COACH_PROMPT,
    CAREER_COUNSELOR_PROMPT,
    PHILOSOPHER_PROMPT,
    TRAVEL_GUIDE_PROMPT,
    EXCEL_SHEET_PROMPT,
    STACKOVERFLOW_POST_PROMPT,
    STARTUP_IDEA_GENERATOR_PROMPT,
    ENGLISH_TRANSLATOR_AND_IMPROVER_PROMPT,
    ADVERTISTER_PROMPT,
    DREAM_INTERPRETER_PROMPT,
    APHORISM_BOOK_PROMPT,
    SELF_HELP_BOOK_PROMPT,
    AI_ASSISTED_DOCTOR_PROMPT,
    STAND_UP_COMEDIAN_PROMPT,
    LOGISTICIAN_PROMPT,
    BUDDHA_PROMPT,
    PERSONAL_TRAINER_PROMPT,
    RECRUITER_PROMPT,
    MOTIVATIONAL_SPEAKER_PROMPT,
    MOVIE_CRITIC_PROMPT,
    NOVELIST_PROMPT,
    SCREENWRITER_PROMPT,
    DEBATE_COACH_PROMPT,
    COMPOSER_PROMPT
  } from '$lib/shared/shared.constant';

  const { close } = getContext('simple-modal') as any;

  /**
   * https://github.com/f/awesome-chatgpt-prompts
   */

  let promptId;
  const activeVoiceTypeClasses = `ring-1 ring-indigo-500 border-indigo-500 z-10`;

  const PROMPT_OPTIONS = [
    {
      promptId: 'storyteller',
      promptLabel: 'Act as a Storyteller',
      prompt: STORYTELLER_PROMPT,
      characterCount: STORYTELLER_PROMPT.length
    },
    {
      promptId: 'STORYTELLER_PROMPT',
      promptLabel: 'Storyteller',
      prompt: STORYTELLER_PROMPT,
      characterCount: STORYTELLER_PROMPT.length
    },
    {
      promptId: 'CHARACTER_FROM_ANYTHING_PROMPT',
      promptLabel: 'Character from anything',
      prompt: CHARACTER_FROM_ANYTHING_PROMPT,
      characterCount: CHARACTER_FROM_ANYTHING_PROMPT.length
    },
    {
      promptId: 'MIDJOURNEY_PROMPT_GENERATOR_PROMPT',
      promptLabel: 'Midjourney prompt generator',
      prompt: MIDJOURNEY_PROMPT_GENERATOR_PROMPT,
      characterCount: MIDJOURNEY_PROMPT_GENERATOR_PROMPT.length
    },
    {
      promptId: 'POSITION_INTERVIEWER_PROMPT',
      promptLabel: 'Position interviewer',
      prompt: POSITION_INTERVIEWER_PROMPT,
      characterCount: POSITION_INTERVIEWER_PROMPT.length
    },
    {
      promptId: 'MENTAL_HEALTH_ADVISER_PROMPT',
      promptLabel: 'Mental health adviser',
      prompt: MENTAL_HEALTH_ADVISER_PROMPT,
      characterCount: MENTAL_HEALTH_ADVISER_PROMPT.length
    },
    {
      promptId: 'RELATIONSHIP_COACH_PROMPT',
      promptLabel: 'Relationship_coach',
      prompt: RELATIONSHIP_COACH_PROMPT,
      characterCount: RELATIONSHIP_COACH_PROMPT.length
    },
    {
      promptId: 'DEBATER_PROMPT',
      promptLabel: 'Debater',
      prompt: DEBATER_PROMPT,
      characterCount: DEBATER_PROMPT.length
    },
    {
      promptId: 'MOTIVATIONAL_COACH_PROMPT',
      promptLabel: 'Motivational coach',
      prompt: MOTIVATIONAL_COACH_PROMPT,
      characterCount: MOTIVATIONAL_COACH_PROMPT.length
    },
    {
      promptId: 'CAREER_COUNSELOR_PROMPT',
      promptLabel: 'Career counselor',
      prompt: CAREER_COUNSELOR_PROMPT,
      characterCount: CAREER_COUNSELOR_PROMPT.length
    },
    {
      promptId: 'PHILOSOPHER_PROMPT',
      promptLabel: 'Philosopher',
      prompt: PHILOSOPHER_PROMPT,
      characterCount: PHILOSOPHER_PROMPT.length
    },
    {
      promptId: 'TRAVEL_GUIDE_PROMPT',
      promptLabel: 'Travel guide',
      prompt: TRAVEL_GUIDE_PROMPT,
      characterCount: TRAVEL_GUIDE_PROMPT.length
    },
    {
      promptId: 'EXCEL_SHEET_PROMPT',
      promptLabel: 'Excel sheet',
      prompt: EXCEL_SHEET_PROMPT,
      characterCount: EXCEL_SHEET_PROMPT.length
    },
    {
      promptId: 'STACKOVERFLOW_POST_PROMPT',
      promptLabel: 'Stackoverflow post',
      prompt: STACKOVERFLOW_POST_PROMPT,
      characterCount: STACKOVERFLOW_POST_PROMPT.length
    },
    {
      promptId: 'STARTUP_IDEA_GENERATOR_PROMPT',
      promptLabel: 'Startup idea generator',
      prompt: STARTUP_IDEA_GENERATOR_PROMPT,
      characterCount: STARTUP_IDEA_GENERATOR_PROMPT.length
    },
    {
      promptId: 'ENGLISH_TRANSLATOR_AND_IMPROVER_PROMPT',
      promptLabel: 'English translator and improver',
      prompt: ENGLISH_TRANSLATOR_AND_IMPROVER_PROMPT,
      characterCount: ENGLISH_TRANSLATOR_AND_IMPROVER_PROMPT.length
    },
    {
      promptId: 'ADVERTISTER_PROMPT',
      promptLabel: 'Advertister',
      prompt: ADVERTISTER_PROMPT,
      characterCount: ADVERTISTER_PROMPT.length
    },
    {
      promptId: 'DREAM_INTERPRETER_PROMPT',
      promptLabel: 'Dream interpreter',
      prompt: DREAM_INTERPRETER_PROMPT,
      characterCount: DREAM_INTERPRETER_PROMPT.length
    },
    {
      promptId: 'APHORISM_BOOK_PROMPT',
      promptLabel: 'Aphorism book',
      prompt: APHORISM_BOOK_PROMPT,
      characterCount: APHORISM_BOOK_PROMPT.length
    },
    {
      promptId: 'SELF_HELP_BOOK_PROMPT',
      promptLabel: 'Self help book',
      prompt: SELF_HELP_BOOK_PROMPT,
      characterCount: SELF_HELP_BOOK_PROMPT.length
    },
    {
      promptId: 'AI_ASSISTED_DOCTOR_PROMPT',
      promptLabel: 'AI assisted doctor',
      prompt: AI_ASSISTED_DOCTOR_PROMPT,
      characterCount: AI_ASSISTED_DOCTOR_PROMPT.length
    },
    {
      promptId: 'STAND_UP_COMEDIAN_PROMPT',
      promptLabel: 'Stand up comedian',
      prompt: STAND_UP_COMEDIAN_PROMPT,
      characterCount: STAND_UP_COMEDIAN_PROMPT.length
    },
    {
      promptId: 'LOGISTICIAN_PROMPT',
      promptLabel: 'Logistician',
      prompt: LOGISTICIAN_PROMPT,
      characterCount: LOGISTICIAN_PROMPT.length
    },
    {
      promptId: 'BUDDHA_PROMPT',
      promptLabel: 'Buddha',
      prompt: BUDDHA_PROMPT,
      characterCount: BUDDHA_PROMPT.length
    },
    {
      promptId: 'PERSONAL_TRAINER_PROMPT',
      promptLabel: 'Personal trainer',
      prompt: PERSONAL_TRAINER_PROMPT,
      characterCount: PERSONAL_TRAINER_PROMPT.length
    },
    {
      promptId: 'RECRUITER_PROMPT',
      promptLabel: 'Recruiter',
      prompt: RECRUITER_PROMPT,
      characterCount: RECRUITER_PROMPT.length
    },
    {
      promptId: 'MOTIVATIONAL_SPEAKER_PROMPT',
      promptLabel: 'Motivational speaker',
      prompt: MOTIVATIONAL_SPEAKER_PROMPT,
      characterCount: MOTIVATIONAL_SPEAKER_PROMPT.length
    },
    {
      promptId: 'MOVIE_CRITIC_PROMPT',
      promptLabel: 'Movie critic',
      prompt: MOVIE_CRITIC_PROMPT,
      characterCount: MOVIE_CRITIC_PROMPT.length
    },
    {
      promptId: 'NOVELIST_PROMPT',
      promptLabel: 'Novelist',
      prompt: NOVELIST_PROMPT,
      characterCount: NOVELIST_PROMPT.length
    },
    {
      promptId: 'SCREENWRITER_PROMPT',
      promptLabel: 'Screenwriter',
      prompt: SCREENWRITER_PROMPT,
      characterCount: SCREENWRITER_PROMPT.length
    },
    {
      promptId: 'DEBATE_COACH_PROMPT',
      promptLabel: 'Debate coach',
      prompt: DEBATE_COACH_PROMPT,
      characterCount: DEBATE_COACH_PROMPT.length
    },
    {
      promptId: 'COMPOSER_PROMPT',
      promptLabel: 'Composer',
      prompt: COMPOSER_PROMPT,
      characterCount: COMPOSER_PROMPT.length
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

  <div class="grid grid-cols-1 gap-x-2 px-4 py-5 sm:p-6 overflow-auto">
    <ul
      class="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4 xl:gap-x-8"
    >
      {#each PROMPT_OPTIONS as { promptId: pId, promptLabel: label, prompt, characterCount }}
        {@const isSelected = pId === promptId}
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
              <!-- Prompt label -->
              {label}
            </p>
            <p
              class="block text-sm font-medium text-gray-500"
              title="Accent origin"
            >
              {characterCount} characters
            </p>
          </div>
        </li>
      {/each}
    </ul>

    <textarea
      class="w-full h-40 mt-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
    />
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
