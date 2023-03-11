<script lang="ts">
  import { createForm } from 'felte';
  import { getNotificationsContext } from 'svelte-notifications';
  import { getContext, onMount } from 'svelte';

  import { nhost } from '$lib/core/nhost/nhost';
  import { NOTIFICATION_SETTINGS } from '$lib/shared/shared.constant';
  import { banners$ } from '$lib/shared/shared.store';
  import { BANNER_TYPE, ERROR, type Banner } from '$lib/shared/shared.type';
  import TextInput from '$lib/shared/form/text-input.svelte';
  import { createUserSettingsQuery } from '$lib/shared/shared.graphql';

  import { validateRegisterForm } from './register-validators';
  import { registerFormConfig } from './register.constant';
  import { browser } from '$app/environment';

  const { addNotification } = getNotificationsContext();

  const { close } = getContext('simple-modal') as any;
  const { registerBag$, isRegistering$ } = getContext('authBag') as any;

  const {
    form,
    data: formValues$,
    errors: errors$,
    touched: touched$,
    // isValid: isValid$,
    isSubmitting: isSubmitting$,
    createSubmitHandler
  } = createForm({ validate: validateRegisterForm });

  onMount(() => {
    registerBag$.set({
      handleSubmit
    });
  });

  /**
   * Form submission
   */
  export const handleSubmit = createSubmitHandler({
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
        const { data, error: userSettingsError } = (await nhost.graphql.request(
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
          close();
          // await nhost.auth.sendVerificationEmail({
          //   email,
          //   options: {
          //     redirectTo: PUBLIC_EMAIL_VERIFICATION_REDIRECT_URL
          //   }
          // });
        } else {
          close();
          banners$.update((state) => [
            ...state.filter((banner: Banner) => banner.bannerId !== ERROR.REGISTRATION),
            {
              bannerId: ERROR.REGISTRATION,
              bannerType: BANNER_TYPE.ERROR,
              title: 'An error occurred while creating your account',
              description: ''
            }
          ]);

          browser &&
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
        }
      }

      // Signup error
      if (error) {
        close();
        banners$.update((state) => [
          ...state.filter((banner) => banner.bannerId !== ERROR.REGISTRATION),
          {
            bannerId: ERROR.REGISTRATION,
            bannerType: BANNER_TYPE.ERROR,
            title: error?.message || 'An error occurred while signing up',
            description: ''
          }
        ]);
        browser &&
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
      }
    }
  });
</script>

<form use:form>
  <div class="flex flex-col justify-center py-6 px-6">
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
    </div>

    <p class="mt-4 text-left text-sm text-gray-600">
      Already have an account?
      <button
        on:click={() => {
          isRegistering$.set(false);
        }}
        type="button"
        class="font-medium text-indigo-600 hover:text-indigo-500">Sign in</button
      >
    </p>
  </div>
</form>
