<script lang="ts">
  import ExclamationCircle from '$lib/shared/icons/exclamation-circle-icon.svelte';

  export let name = '';
  export let label = '';
  export let type = 'text';
  export let helpText = '';
  export let isOptional = false;
  export let classOverride = '';

  export let touched$;
  export let errors$;

  $: showError = $touched$[name] && $errors$[name];
  $: inputClasses = showError
    ? `block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md`
    : classOverride
    ? classOverride
    : `block w-full focus:ring-indigo-500 focus:border-indigo-500 flex-1 rounded sm:text-sm border-gray-300`;
</script>

<!-- Label -->
{#if label}
  <label
    for={label}
    class="block text-sm font-medium text-gray-700"
  >
    {label}
    {#if isOptional}
      <span class="font-light text-sm text-gray-500"> (optional)</span>
    {/if}
  </label>
{/if}

<!-- Input -->
<div class="mt-1 relative flex rounded-md shadow-sm">
  {#if type === 'text'}
    <input
      id={name}
      {name}
      type="text"
      class={inputClasses}
    />
  {:else if type === 'password'}
    <input
      id={name}
      {name}
      type="password"
      class={inputClasses}
    />
  {:else if type === 'email'}
    <input
      id={name}
      {name}
      type="email"
      class={inputClasses}
    />
  {:else}
    <input
      id={name}
      {name}
      type="number"
      class={inputClasses}
    />
  {/if}

  <!-- Trailing dropdown -->
  <slot name="trailing-dropdown" />
</div>

<!-- Error message -->
{#if showError}
  <p
    class="flex gap-1 mt-2 text-sm text-red-600"
    id="email-error"
  >
    <ExclamationCircle />
    {$errors$[name]}
  </p>
{/if}

<!-- Help text -->
{#if helpText}
  <p class="mt-2 text-sm text-gray-500">
    {helpText}
  </p>
{/if}
