<script lang="ts">
  import { createForm } from 'felte';
  import { getNotificationsContext } from 'svelte-notifications';
  import { goto } from '$app/navigation';

  import { nhost } from '$lib/core/nhost/nhost';
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import { LOGO_CDN_LINK, NOTIFICATION_SETTINGS } from '$lib/shared/shared.constant';
  import { BANNER_TYPE, ERROR } from '$lib/shared/shared.type';
  import { banners$, isSignedIn$ } from '$lib/shared/shared.store';
  import TextInput from '$lib/shared/form/text-input.svelte';

  import { validateLoginForm } from './login-validators';
  import { loginFormConfig } from './login.constant';
  import { onMount } from 'svelte';

  const { addNotification } = getNotificationsContext();

  const {
    form,
    data: formValues$,
    errors: errors$,
    touched: touched$,
    // isValid: isValid$,
    isSubmitting: isSubmitting$,
    createSubmitHandler
  } = createForm({ validate: validateLoginForm });

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
  const handleSubmit = createSubmitHandler({
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
        goto('/');
      }

      if (error) {
        banners$.update((state) => [
          ...state.filter((banner) => banner.bannerId !== ERROR.LOGIN),
          {
            bannerId: ERROR.LOGIN,
            bannerType: BANNER_TYPE.ERROR,
            title: error?.message || 'An error occurred while signing in',
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
      <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <a
            href={`/`}
            class="flex flex-shrink-0 mb-8 justify-start items-center gap-2"
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
              Sign in to your account
            </h1>

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

              <div class="flex items-center justify-between">
                <!-- <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    for="remember-me"
                    class="ml-2 block text-sm text-gray-900">Remember me</label
                  >
                </div> -->

                <div class="text-sm">
                  <button
                    on:click={handleResetPassword}
                    type="button"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                    >Forgot your password?</button
                  >
                </div>
              </div>

              <button
                on:click={handleSubmit}
                type="submit"
                class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >Sign in</button
              >
            </div>
          </div>

          <!-- Signup -->
          <p class="mt-4 text-center text-sm text-gray-600">
            Don't have an account?
            <a
              href="/register"
              class="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a
            >
          </p>
        </div>
      </div>
    </form>
  </svelte:fragment>
</PageContainer>
