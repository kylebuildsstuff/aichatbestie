<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';

  import { banners$, chatFolders$, chatList$ } from '$lib/shared/shared.store';
  import { BANNER_TYPE, ERROR, LOCAL_STORAGE_KEY } from '$lib/shared/shared.type';
  import ChevronRightIcon from '$lib/shared/icons/chevron-right-icon.svelte';
  import ChevronDownIcon from '$lib/shared/icons/chevron-down-icon.svelte';
  import { truncateString } from '$lib/shared/shared-utils';
  import CheckIcon from '$lib/shared/icons/check-icon.svelte';
  import XMarkIcon from '$lib/shared/icons/x-mark-icon.svelte';
  import PencilSquareIcon from '$lib/shared/icons/pencil-square-icon.svelte';
  import TrashIcon from '$lib/shared/icons/trash-icon.svelte';
  import SidebarChatItem from './sidebar-chat-item.svelte';

  const flipDurationMs = 200;

  export let folderId;
  export let folderName;
  export let chatIds;

  let isEditing = false;
  let isHovering = false;
  let isCollapsed = true;
  let folderNameInput = folderName;

  const handleSaveFolderEditClick = () => {
    chatFolders$.update((folders) => {
      const updatedFolders = folders.map((f) => {
        if (f.folderId === folderId) {
          f.folderName = folderNameInput;
        }
        return f;
      });
      return updatedFolders;
    });
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY.CHAT_FOLDERS,
        JSON.stringify($chatFolders$)
      );
    } catch (e: any) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.LOCAL_STORAGE_SET_ITEM,
          type: BANNER_TYPE.ERROR,
          message: e.message
        });
        return banners;
      });
    }
    isEditing = false;
  };

  const handleDeleteFolder = (fId: string) => {
    chatFolders$.update((folders) => {
      const updatedFolders = folders.filter((f) => f.folderId !== fId);
      return updatedFolders;
    });
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY.CHAT_FOLDERS,
        JSON.stringify($chatFolders$)
      );
    } catch (e: any) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.LOCAL_STORAGE_SET_ITEM,
          type: BANNER_TYPE.ERROR,
          message: e.message
        });
        return banners;
      });
    }
  };
</script>

<button
  on:click={(e) => {
    if (isEditing) {
      return;
    }

    isCollapsed = !isCollapsed;
  }}
  on:mouseenter={() => {
    isHovering = true;
  }}
  on:mouseleave={() => {
    isHovering = false;
  }}
  type="button"
  class={`relative w-full text-gray-300 hover:bg-gray-700 group flex items-center px-2 py-3 text-sm font-medium rounded-md`}
>
  <!-- Title  -->
  <div class="flex flex-1 justify-start items-center flex-nowrap">
    {#if isCollapsed}
      <ChevronRightIcon
        overrideClasses={`text-gray-400 hover:text-gray-500 mr-3 flex-shrink-0 h-5 w-5`}
      />
    {:else}
      <ChevronDownIcon
        overrideClasses={`text-gray-400 hover:text-gray-500 mr-3 flex-shrink-0 h-5 w-5`}
      />
    {/if}
    {#if isEditing}
      <input
        bind:value={folderNameInput}
        on:click={(e) => e.stopPropagation()}
        type="text"
        name="title"
        class="block w-full mr-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    {:else}
      <span
        class="text-left overflow-hidden whitespace-nowrap"
        title={folderNameInput}
      >
        {truncateString(folderNameInput)}
      </span>
    {/if}
  </div>

  <!-- Actions -->
  {#if isEditing}
    <div class="flex gap-2">
      <button on:click={() => handleSaveFolderEditClick()}>
        <CheckIcon overrideClasses={`text-gray-400 hover:text-gray-300 h-3.5 w-3.5`} />
      </button>
      <button on:click={() => (isEditing = false)}>
        <XMarkIcon overrideClasses={`text-gray-400 hover:text-gray-300 h-3.5 w-3.5`} />
      </button>
    </div>
  {:else if isHovering}
    <div class="flex gap-2">
      <button on:click={() => (isEditing = true)}>
        <PencilSquareIcon
          overrideClasses={`text-gray-400 hover:text-gray-300 h-3.5 w-3.5`}
        />
      </button>
      <button on:click={() => handleDeleteFolder(folderId)}>
        <TrashIcon overrideClasses={`text-gray-400 hover:text-gray-300 h-3.5 w-3.5`} />
      </button>
    </div>
  {/if}
</button>

{#each chatIds as chatId}
  {@const title = $chatList$.find((i) => i.chatId === chatId)?.title}
  <SidebarChatItem
    chatId
    {title}
  />
{/each}
