<script lang="ts">
  import { createForm } from 'felte';
  import { getNotificationsContext } from 'svelte-notifications';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import { nhost } from '$lib/core/nhost/nhost';
  import { LOGO_CDN_LINK, NOTIFICATION_SETTINGS } from '$lib/shared/shared.constant';
  import { banners$, isSignedIn$ } from '$lib/shared/shared.store';
  import { BANNER_TYPE, ERROR, type Banner } from '$lib/shared/shared.type';
  import TextInput from '$lib/shared/form/text-input.svelte';
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import { createUserSettingsQuery } from '$lib/shared/shared.graphql';

  import { validateRegisterForm } from './register-validators';
  import { registerFormConfig } from './register.constant';

  const { addNotification } = getNotificationsContext();

  const {
    form,
    data: formValues$,
    errors: errors$,
    touched: touched$,
    // isValid: isValid$,
    isSubmitting: isSubmitting$,
    createSubmitHandler
  } = createForm({ validate: validateRegisterForm });

  /**
   * Form submission
   */
  const handleSubmit = createSubmitHandler({
    onSubmit: async (submittedFormValues) => {
      const { email = '', password = '' } = submittedFormValues;

      await nhost.auth.signOut();

      /**
       * session returns null upon error, and upon success if email verification is required
       * error returns null on success
       */
      const { session, error } = await nhost.auth.signUp({
        email,
        password
      });

      // Successful signup (response shape is in types, not docs)
      if (session && !error) {
        const userId = session?.user?.id;

        // Create UserSettings
        const { error: userSettingsError } = (await nhost.graphql.request(
          createUserSettingsQuery,
          {
            userId
          }
        )) as any;

        if (!userSettingsError) {
          addNotification({
            ...NOTIFICATION_SETTINGS,
            text: 'Account created'
          });
          goto('/');
          // await nhost.auth.sendVerificationEmail({
          //   email,
          //   options: {
          //     redirectTo: PUBLIC_EMAIL_VERIFICATION_REDIRECT_URL
          //   }
          // });
        } else {
          banners$.update((state) => [
            ...state.filter((banner: Banner) => banner.bannerId !== ERROR.REGISTRATION),
            {
              bannerId: ERROR.REGISTRATION,
              bannerType: BANNER_TYPE.ERROR,
              title: 'An error occurred while creating your account',
              description: ''
            }
          ]);
        }
      }

      // Signup error
      if (error) {
        banners$.update((state) => [
          ...state.filter((banner) => banner.bannerId !== ERROR.REGISTRATION),
          {
            bannerId: ERROR.REGISTRATION,
            bannerType: BANNER_TYPE.ERROR,
            title: error?.message || 'An error occurred while creating your account',
            description: ''
          }
        ]);
      }
    }
  });

  onMount(() => {
    if ($isSignedIn$) {
      goto('/settings');
    }
  });
</script>

<PageContainer>
  <svelte:fragment slot="page-content">
    <form use:form>
      <div class="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <a
            href={`/`}
            class="flex flex-shrink-0 mb-6 justify-start items-center gap-2"
          >
            <div class="inline-flex">
              <span class="sr-only">AI Chat Bestie</span>
              <img
                class="h-10 w-auto"
                src={LOGO_CDN_LINK}
                alt=""
              />
            </div>
            <span class="text-2xl mt-4 font-medium"> AI Chat Bestie </span>
          </a>

          <div
            class="bg-white py-8 px-4 border border-gray-200 shadow sm:rounded-lg sm:px-10"
          >
            <h1 class="mb-8 text-left text-2xl font-bold tracking-tight text-gray-900">
              Create your account
            </h1>

            <div class="space-y-6">
              <div class="mt-1">
                <TextInput
                  name={registerFormConfig.email.name}
                  label={registerFormConfig.email.label}
                  type="email"
                  classOverride="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {touched$}
                  {errors$}
                />
              </div>
              <div class="mt-1">
                <TextInput
                  name={registerFormConfig.password.name}
                  label={registerFormConfig.password.label}
                  type="password"
                  classOverride="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {touched$}
                  {errors$}
                />
              </div>

              <button
                on:click={handleSubmit}
                type="submit"
                class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >Create account</button
              >
            </div>
          </div>

          <!-- Signup -->
          <p class="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <a
              href="/login"
              class="font-medium text-indigo-600 hover:text-indigo-500">Sign in</a
            >
          </p>
        </div>
      </div>
    </form>
  </svelte:fragment>
</PageContainer>
