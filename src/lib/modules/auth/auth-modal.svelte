<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Register from './register/register.svelte';
  import Login from './login/login.svelte';

  const { close } = getContext('simple-modal') as any;

  let isRegistering$ = writable(true);
  let registerBag$ = writable({} as any);
  let loginBag$ = writable({} as any);

  $: modalTitle = $isRegistering$ ? 'Create your account' : 'Sign in to your account';
  $: modalCtaText = $isRegistering$ ? 'Create account' : 'Sign in';

  setContext('authBag', {
    isRegistering$,
    registerBag$,
    loginBag$
  });

  const closeModal = () => {
    close();
  };

  const handleRegister = () => {
    $registerBag$.handleSubmit();
  };

  const handleLogin = () => {
    $loginBag$.handleSubmit();
  };
</script>

<div class="bg-white rounded-lg border-gray-200 divide-y">
  <!-- Header -->
  <div class="bg-white px-3 py-2">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      {modalTitle}
    </h3>
  </div>

  {#if $isRegistering$}
    <Register />
  {:else}
    <Login />
  {/if}

  <!-- CTAs -->
  <div class="pt-5">
    <div class="flex gap-2 justify-end">
      <button
        on:click={closeModal}
        type="button"
        class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
      <button
        on:click={$isRegistering$ ? handleRegister : handleLogin}
        class="disabled:opacity-50 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {modalCtaText}
      </button>
    </div>
  </div>
</div>
