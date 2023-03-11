<script>
  import { onMount } from 'svelte';
  import Notifications from 'svelte-notifications';
  import Modal from 'svelte-simple-modal';

  import Toast from '$lib/modules/toast/toast.svelte';
  import { nhost } from '$lib/core/nhost/nhost';
  import { BANNER_TYPE, ERROR, NHOST_AUTH_STATE } from '$lib/shared/shared.type';
  import { fetchUserDataQuery } from '$lib/shared/shared.graphql';
  import { banners$, user$, userSettings$ } from '$lib/shared/shared.store';

  import '../app.css';

  let _Toast = Toast;

  let isInitializing = false;
  let isInitialized = false;

  onMount(async () => {
    // cover AFTER onMount cases... the order of calling DOES change depending on nhost connection
    nhost.auth.onAuthStateChanged(async (event, session) => {
      const isSignedIn = event === NHOST_AUTH_STATE.SIGNED_IN;
      const userId = session?.user?.id;

      if (isSignedIn && userId) {
        isInitializing = true;
        const { data, error } = await nhost.graphql.request(fetchUserDataQuery, {
          userId
        });

        if (error) {
          banners$.update((state) => [
            ...state.filter((banner) => banner.bannerId !== ERROR.USER_DATA_FETCH),
            {
              bannerId: ERROR.USER_DATA_FETCH,
              bannerType: BANNER_TYPE.ERROR,
              title: 'An error occurred while fetching your account',
              description: ''
            }
          ]);
        }

        if (data) {
          user$.set(data.user || {});
          userSettings$.set(data.userSettingsByPk || {});
          isInitialized = true;
        }
        isInitializing = false;
      }
    });

    // Cover BEFORE onMount cases
    if (!isInitializing && !isInitialized) {
      const isAuthenticated = nhost?.auth?.isAuthenticated?.();
      const session = nhost?.auth?.getSession?.();
      const userId = session?.user?.id;

      if (!isAuthenticated || !userId) {
        return;
      }
      isInitializing = true;

      const { data, error } = await nhost.graphql.request(fetchUserDataQuery, {
        userId
      });

      if (error) {
        banners$.update((state) => [
          ...state.filter((banner) => banner.bannerId !== ERROR.USER_DATA_FETCH),
          {
            bannerId: ERROR.USER_DATA_FETCH,
            bannerType: BANNER_TYPE.ERROR,
            title: 'An error occurred while fetching your account',
            description: ''
          }
        ]);
      }

      if (data) {
        user$.set(data.user || {});
        userSettings$.set(data.userSettingsByPk || {});
        isInitialized = true;
      }
      isInitializing = false;
    }
  });
</script>

<svelte:head>
  <title>AI Chat Bestie - Enhanced UI Wrapper for ChatGPT</title>
  <meta
    name="description"
    content={'Enhance your ChatGPT experience with faster response times, customizable prompts, searchable history, and more.'}
  />
</svelte:head>

<Notifications item={_Toast}>
  <Modal
    closeButton={true}
    unstyled={false}
    styleWindow={{ width: '80%' }}
  >
    <slot />
  </Modal>
</Notifications>
