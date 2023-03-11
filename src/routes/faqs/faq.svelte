<script lang="ts">
  import { slide } from 'svelte/transition';

  export let question = '';
  export let answer = '';

  let isCollapsed = true;

  const toggleCollapse = () => {
    isCollapsed = !isCollapsed;
  };
</script>

<div class="pt-6">
  <dt>
    <!-- Expand/collapse question button -->
    <button
      on:click={toggleCollapse}
      type="button"
      class="flex w-full items-start justify-between text-left text-gray-900"
      aria-controls="faq-0"
      aria-expanded="false"
    >
      <span class="text-base font-semibold leading-7"
        >What&#039;s the best thing about Switzerland?</span
      >
      <span class="ml-6 flex h-7 items-center">
        {#if isCollapsed}
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        {:else}
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 12H6"
            />
          </svg>
        {/if}
      </span>
    </button>
  </dt>

  <!-- Expand/collapse answer -->
  {#if !isCollapsed}
    <dd
      transition:slide
      class="mt-2 pr-12"
    >
      <p class="text-base leading-7 text-gray-600">
        I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
      </p>
    </dd>
  {/if}
</div>
