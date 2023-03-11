<script lang="ts">
  import { createForm } from 'felte';
  import { getContext } from 'svelte';
  import { getNotificationsContext } from 'svelte-notifications';
  import { NOTIFICATION_SETTINGS } from '$lib/shared/shared.constant';

  import { nhost } from '$lib/core/nhost/nhost';

  import { validateChangePasswordForm } from './settings-validators';
  import { changePasswordFormConfig as formConfig } from './settings.constant';
  import { banners$ } from '$lib/shared/shared.store';
  import { BANNER_TYPE, ERROR } from '$lib/shared/shared.type';

  const { close } = getContext('simple-modal') as any;
  const { addNotification } = getNotificationsContext();

  const {
    form,
    data: formValues$,
    errors: errors$,
    touched: touched$,
    // isValid: isValid$,
    isSubmitting: isSubmitting$,
    createSubmitHandler
    // setData
  } = createForm({
    validate: validateChangePasswordForm,
    initialValues: {
      password: ''
    }
  });

  const handleCancelClick = () => {
    close();
  };

  /**
   * Form submission
   */
  const handleSubmit = createSubmitHandler({
    onSubmit: async (submittedFormValues) => {
      const { password } = submittedFormValues;

      const { error } = await nhost.auth.changePassword({ newPassword: password });

      if (error) {
        banners$.update((state) => [
          ...state.filter((banner) => banner.bannerId !== ERROR.PASSWORD_CHANGE),
          {
            bannerId: ERROR.PASSWORD_CHANGE,
            bannerType: BANNER_TYPE.ERROR,
            title: 'A problem occurred while updating your password',
            description:
              'Please refresh the page and try again later, or contact support.'
          }
        ]);
      }

      if (!error) {
        addNotification({
          ...NOTIFICATION_SETTINGS,
          text: 'Password saved'
        });
        close();
      }
    }
  });
</script>

<form use:form>
  <div class="bg-white rounded-lg">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Change password</h3>
    </div>

    <div class="px-4 py-5 sm:p-6">
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
        <label
          for="username"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          New password
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <div class="max-w-lg flex rounded-md shadow-sm">
            <input
              class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
              type="text"
              name={formConfig.password.name}
            />
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <button
          on:click={handleCancelClick}
          type="button"
          class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >Cancel</button
        >
        <button
          on:click={handleSubmit}
          class="ml-3 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >Save</button
        >
      </div>
    </div>
  </div>
</form>
