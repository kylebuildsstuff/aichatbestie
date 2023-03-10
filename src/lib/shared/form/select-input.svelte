<script lang="ts">
  import ExclamationCircleIcon from '$lib/shared/icons/exclamation-circle-icon.svelte';

  export let name = '';
  export let label = '';
  export let helpText = '';
  export let isOptional = false;
  export let options;
  export let isTransparent = false;

  export let touched$;
  export let errors$;

  const baseClasses = `block w-full text-base ${
    isTransparent ? '' : 'mt-1 pl-3 pr-10 py-2'
  }`;
  const transparentClasses = isTransparent
    ? `h-full py-0 pl-2 pr-7 text-gray-500 sm:text-sm rounded-md border-transparent bg-transparent`
    : ``;

  $: showError = $touched$[name] && $errors$[name];
  $: errorClasses = showError
    ? `text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md ${
        isTransparent ? '' : 'border-red-300'
      }`
    : `focus:ring-indigo-500 focus:border-indigo-500 flex-1 rounded sm:text-sm ${
        isTransparent ? '' : 'border-gray-300'
      }`;
</script>

{#if label}
  <label
    for="location"
    class="block text-sm font-medium text-gray-700"
    >{label}
    {#if isOptional}
      <span class="font-light text-sm text-gray-500"> (optional)</span>
    {/if}
  </label>
{/if}

<select
  id={name}
  {name}
  class={`${baseClasses} ${errorClasses} ${transparentClasses}`}
>
  {#each options as { label: optionLabel, value }}
    <option {value}>{optionLabel}</option>
  {/each}
</select>

<!-- Error message -->
{#if showError}
  <p
    class="flex gap-1 mt-2 text-sm text-red-600"
    id="email-error"
  >
    <ExclamationCircleIcon />
    {$errors$[name]}
  </p>
{/if}

<!-- Help text -->
{#if helpText}
  <p class="mt-2 text-sm text-gray-500">
    {helpText}
  </p>
{/if}
