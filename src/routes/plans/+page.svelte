<script lang="ts">
  import { onMount } from 'svelte';
  import { DateTime } from 'luxon';
  import { getNotificationsContext } from 'svelte-notifications';

  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import { banners$, isSignedIn$ } from '$lib/shared/shared.store';
  import { nhost } from '$lib/core/nhost/nhost';
  import { readResponseStreamAsJson, throwIfHttpError } from '$lib/shared/shared-utils';
  import { APP_PRODUCT, BANNER_TYPE, ERROR } from '$lib/shared/shared.type';
  import { goto } from '$app/navigation';

  const { addNotification } = getNotificationsContext();

  // early bird pricing ends March 16th, 2023 8pm EST
  const earlyBirdEnds = DateTime.fromISO('2023-03-16T20:00:00.000Z');
  $: countdown = earlyBirdEnds.diffNow(['days', 'hours', 'minutes', 'seconds']);
  $: formattedCountdownString = countdown.toFormat("d'd' h'h' m'm' s's'");

  // set interval for countdown
  onMount(() => {
    setInterval(() => {
      countdown = earlyBirdEnds.diffNow(['days', 'hours', 'minutes', 'seconds']);
      formattedCountdownString = countdown.toFormat("d'd' h'h' m'm' s's'");
    }, 1000);
  });

  const handlePurchase = async () => {
    const accessToken = nhost.auth.getAccessToken();

    console.log('accessToken: ', accessToken);

    if (accessToken) {
      const url = `/api/payments/checkout-session`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          appProduct: APP_PRODUCT.BESTIES_FOREVER
        })
      })
        .then(throwIfHttpError)
        .then(readResponseStreamAsJson)
        .catch((_) => {
          banners$.update((state) => [
            ...state.filter(
              (banner) => banner.bannerId !== ERROR.CHECKOUT_SESSION_CREATE
            ),
            {
              bannerId: ERROR.CHECKOUT_SESSION_CREATE,
              bannerType: BANNER_TYPE.ERROR,
              title: 'A problem occurred while proceeding to checkout',
              description:
                'Please refresh the page and try again later, or contact support.'
            }
          ]);
        });

      const checkoutUrl = res?.checkoutUrl || '';

      if (checkoutUrl) {
        goto(checkoutUrl);
      }
    }
  };
</script>

<PageContainer>
  <!-- Page content -->
  <svelte:fragment slot="page-content">
    <div class="relative flex flex-col bg-white py-12 max-w-7xl px-6 md:px-16 ">
      <div class="bg-white py-8 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl sm:text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Unlock all the features
            </h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Further enhance your ChatGPT experience with upcoming customizations for
              prompts, chats, UI, and more.
            </p>
          </div>
          <div
            class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none"
          >
            <div class="p-8 sm:p-10 lg:flex-auto">
              <h3
                class="text-2xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text"
              >
                Besties Forever
              </h3>
              <p class="mt-6 text-base leading-7 text-gray-600">
                Get exclusive access to all current and future premium features, while
                continuing to enjoy the forever free base features. Join the Besties
                Forever membership and enjoy AI Chat Bestie to the fullest!
              </p>
              <div class="mt-10 flex items-center gap-x-4">
                <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  What’s coming March 2023
                  <!-- Included -->
                </h4>
                <div class="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                <li class="flex gap-x-3">
                  <svg
                    class="h-6 w-5 flex-none text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Prompt library
                </li>

                <li class="flex gap-x-3">
                  <svg
                    class="h-6 w-5 flex-none text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  Saved profiles
                </li>

                <li class="flex gap-x-3">
                  <svg
                    class="h-6 w-5 flex-none text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Dark mode
                </li>

                <li class="flex gap-x-3">
                  <svg
                    class="h-6 w-5 flex-none text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Custom themes
                </li>
              </ul>
            </div>
            <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div
                class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16"
              >
                <div class="mx-auto max-w-xs px-8">
                  <p class="text-base font-semibold text-gray-600">
                    Pay once, own it forever
                  </p>
                  <p class="mt-6 flex items-baseline justify-center gap-x-2">
                    <span class="mt-2 text-3xl font-medium text-gray-500 line-through">
                      $19
                    </span>
                    <span
                      class="text-5xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text"
                    >
                      $9
                    </span>
                  </p>
                  <p class="mt-2 text-xs font-semibold text-gray-600">
                    Early bird price ends in
                  </p>
                  <p class="mt-2 text-sm font-semibold text-gray-600">
                    {formattedCountdownString}
                  </p>

                  {#if $isSignedIn$}
                    <button
                      on:click={handlePurchase}
                      class="mt-8 block w-full text-center hover:underline bg-gradient-to-r from-emerald-400 to-cyan-400 text-lg text-white font-bold rounded py-3 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                      Get access
                    </button>
                  {:else}
                    <a
                      href="/register"
                      class="mt-8 block w-full text-center hover:underline bg-gradient-to-r from-emerald-400 to-cyan-400 text-lg text-white font-bold rounded py-3 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                      <div class="flex flex-col gap-1">
                        <div>Get access</div>
                        <span class="text-xs">(account required)</span>
                      </div>
                    </a>
                  {/if}
                  <p class="mt-6 text-xs leading-5 text-gray-600">
                    Invoices and receipts available for easy company reimbursement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </svelte:fragment>
</PageContainer>
