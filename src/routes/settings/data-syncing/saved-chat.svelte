<script lang="ts">
  import { browser } from '$app/environment';
  import { nhost } from '$lib/core/nhost/nhost';
  import { NOTIFICATION_SETTINGS } from '$lib/shared/shared.constant';
  import { DELETE_USER_SAVED_CHAT } from '$lib/shared/shared.graphql';
  import { banners$, chatList$, chats$, savedChats$ } from '$lib/shared/shared.store';
  import { BANNER_TYPE, ERROR, LOCAL_STORAGE_KEY } from '$lib/shared/shared.type';
  import { DateTime } from 'luxon';
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();

  export let id;
  export let label;
  export let createdAt;
  export let updatedAt;
  export let chats;

  // Luxon date format as "Jan. 3, 2021, 12:00 AM"
  const formattedCreatedAt = DateTime.fromISO(createdAt).toLocaleString(
    DateTime.DATETIME_MED
  );

  $: formattedLabel = label || formattedCreatedAt || 'Untitled';

  /**
   * Export chat
   */
  function downloadObjectAsJson(obj, fileName) {
    // Convert the JS object to a JSON string
    const jsonString = JSON.stringify(obj, null, 2);

    // Create a Blob object with the JSON string and the correct MIME type
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a URL from the Blob object
    const url = URL.createObjectURL(blob);

    // Create an anchor element with the `download` attribute
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;

    // Append the link to the DOM, trigger a click, and remove it afterward
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  }

  const handleExportClick = () => {
    const fileName = `export_chat_${id}.json`;
    const objToExport = {
      id,
      label,
      createdAt,
      updatedAt,
      chats
    };
    downloadObjectAsJson(objToExport, fileName);
  };

  /**
   * Delete chat
   */
  const handleDeleteSavedChat = async () => {
    const { data, error } = await nhost.graphql.request(DELETE_USER_SAVED_CHAT, {
      id
    });

    if (!error) {
      const deletedChatId = data?.deleteSavedChatsByPk?.id;
      savedChats$.update((savedChats) => {
        return savedChats.filter((savedChat) => savedChat.id !== deletedChatId);
      });

      addNotification({
        ...NOTIFICATION_SETTINGS,
        text: 'Saved chats deleted'
      });
    } else {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.DATA_SYNC_DELETE_SAVED_CHAT,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Deleting saved chat failed',
          description: ''
        });
        return banners;
      });
    }
  };

  const handleImportClick = async () => {
    const chatList = chats.map((chat) => ({
      chatId: chat.chatId,
      title: chat.title,
      messages: chat.messages
    }));

    const chatsObject = chats.reduce((acc, chat) => {
      acc[chat.chatId] = {
        chatId: chat.chatId,
        messages: chat.messages
      };
      return acc;
    }, {});

    chatList$.set(chatList);
    chats$.set(chatsObject);

    if ($chatList$ && browser) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
        addNotification({
          ...NOTIFICATION_SETTINGS,
          text: 'Chat list imported'
        });
      } catch (e: any) {
        banners$.update((banners) => {
          banners.push({
            id: ERROR.LOCAL_STORAGE_SET_ITEM,
            bannerType: BANNER_TYPE.ERROR,
            title: 'Access to browser storage failed',
            description: e?.message || e?.name || ''
          });
          return banners;
        });
      }
    }

    if ($chats$ && browser) {
      try {
        Object.keys($chats$).forEach((key) => {
          localStorage.setItem(key, JSON.stringify($chats$[key]));
        });
        addNotification({
          ...NOTIFICATION_SETTINGS,
          text: 'Chats imported'
        });
      } catch (e: any) {
        banners$.update((banners) => {
          banners.push({
            id: ERROR.LOCAL_STORAGE_SET_ITEM,
            bannerType: BANNER_TYPE.ERROR,
            title: 'Access to browser storage failed',
            description: e?.message || e?.name || ''
          });
          return banners;
        });
      }
    }
  };
</script>

<div class="flex items-center justify-between py-4 sm:py-5">
  <dt class="text-sm font-medium text-gray-500">{formattedLabel}</dt>

  <dd class="flex gap-2 text-sm text-gray-900">
    <button
      type="button"
      class="inline-flex items-center bg-white py-2 px-3 border border-red-300 rounded-md shadow-sm text-sm leading-4 font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      on:click={handleDeleteSavedChat}
    >
      Delete
    </button>

    <button
      type="button"
      class="inline-flex items-center bg-white py-2 px-3 border border-green-300 rounded-md shadow-sm text-sm leading-4 font-medium text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      on:click={handleExportClick}
    >
      Export
    </button>

    <button
      type="button"
      class="inline-flex items-center bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      on:click={handleImportClick}
    >
      Import
    </button>
  </dd>
</div>
