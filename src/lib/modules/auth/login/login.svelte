<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { createForm } from 'felte';
  import { getNotificationsContext } from 'svelte-notifications';

  import { nhost } from '$lib/core/nhost/nhost';

  import { NOTIFICATION_SETTINGS } from '$lib/shared/shared.constant';
  import { BANNER_TYPE, ERROR } from '$lib/shared/shared.type';
  import { banners$ } from '$lib/shared/shared.store';
  import TextInput from '$lib/shared/form/text-input.svelte';

  import { validateLoginForm } from './login-validators';
  import { loginFormConfig } from './login.constant';
  import { browser } from '$app/environment';

  const { addNotification } = getNotificationsContext();

  const { close } = getContext('simple-modal') as any;
  const { loginBag$, isRegistering$ } = getContext('authBag') as any;

  const {
    form,
    data: formValues$,
    errors: errors$,
    touched: touched$,
    // isValid: isValid$,
    isSubmitting: isSubmitting$,
    createSubmitHandler
  } = createForm({ validate: validateLoginForm });

  onMount(() => {
    loginBag$.set({
      handleSubmit
    });
  });

  const handleResetPassword = async () => {
    const response = await nhost.auth.resetPassword({
      email: $formValues$.email
    });

    const error = response?.error;

    if (!error) {
      addNotification({
        ...NOTIFICATION_SETTINGS,
        text: 'Password reset email sent'
      });
    }

    if (error) {
      banners$.update((state) => [
        ...state.filter((banner) => banner.bannerId !== ERROR.PASSWORD_RESET),
        {
          bannerId: ERROR.PASSWORD_RESET,
          bannerType: BANNER_TYPE.ERROR,
          title: error?.message || 'An error occurred while resetting your password',
          description: ''
        }
      ]);
    }
  };

  /**
   * Form submission
   */
  export const handleSubmit = createSubmitHandler({
    onSubmit: async (submittedFormValues) => {
      const { email = '', password = '' } = submittedFormValues;

      const { session, error } = await nhost.auth.signIn({
        email,
        password
      });

      if (session) {
        addNotification({
          ...NOTIFICATION_SETTINGS,
          text: 'Sign in successful'
        });
        close();
      }

      if (error) {
        close();
        banners$.update((state) => [
          ...state.filter((banner) => banner.bannerId !== ERROR.LOGIN),
          {
            bannerId: ERROR.LOGIN,
            bannerType: BANNER_TYPE.ERROR,
            title: error?.message || 'An error occurred while signing in',
            description: ''
          }
        ]);
        // scroll window to top
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
          name={loginFormConfig.email.name}
          label={loginFormConfig.email.label}
          classOverride="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          {touched$}
          {errors$}
        />
      </div>

      <div class="mt-1">
        <TextInput
          name={loginFormConfig.password.name}
          label={loginFormConfig.password.label}
          type="password"
          classOverride="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          {touched$}
          {errors$}
        />
      </div>
    </div>

    <div class="mt-4 flex flex-wrap gap-2 items-center justify-between">
      <!-- Signup -->
      <p class="text-center text-sm text-gray-600">
        Don't have an account?
        <button
          on:click={() => {
            isRegistering$.set(true);
          }}
          type="button"
          class="font-medium text-indigo-600 hover:text-indigo-500">Sign up</button
        >
      </p>

      <div class="text-sm">
        <button
          on:click={handleResetPassword}
          type="button"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >Forgot your password?</button
        >
      </div>
    </div>
  </div>
</form>
