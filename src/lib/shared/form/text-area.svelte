<script lang="ts">
  import { path, pathOr } from 'ramda';
  import { onMount } from 'svelte';

  import ExclamationCircle from '$lib/shared/icons/exclamation-circle-icon.svelte';

  export let name = '';
  export let label = '';
  export let helpText = '';
  export let isOptional = false;
  export let rows = 3;
  export let autoExpand = false;

  export let touched$;
  export let errors$;

  let element;

  $: showError = path(name.split('.'), $touched$) && path(name.split('.'), $errors$);
  $: inputClasses = showError
    ? `pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md`
    : `focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md`;

  const handleInput = () => {
    if (!autoExpand) return;

    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  onMount(() => {
    if (!autoExpand) return;

    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  });
</script>

<label
  for={label}
  class="block text-sm font-medium text-gray-700"
>
  {label}
  {#if isOptional}
    <span class="font-light text-sm text-gray-500"> (optional)</span>
  {/if}
</label>

<div class="mt-1 relative">
  <textarea
    bind:this={element}
    on:input={handleInput}
    id={name}
    {name}
    {rows}
    class={`block w-full shadow-sm ${inputClasses}`}
    class:resize-y={autoExpand}
  />
</div>

<!-- Error message -->
{#if showError}
  <p
    class="flex gap-1 mt-2 text-sm text-red-600"
    id="email-error"
  >
    <ExclamationCircle />
    {pathOr('Something went wrong', name.split('.'), $errors$)}
  </p>
{/if}

<!-- Help text -->
{#if helpText}
  <p class="mt-2 text-sm text-gray-500">
    {helpText}
  </p>
{/if}
