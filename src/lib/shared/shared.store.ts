import { derived, writable } from 'svelte/store';

import type { Chat, ChatListItem, UserSettings } from './shared.type';

/**
 * Banners
 */
export const banners$ = writable([] as any);

export const hasBanners$ = derived(banners$, (banners) => {
  return banners.length > 0;
});

/**
 * localStorage
 */
export const openAiApiKey$ = writable('');
export const chatList$ = writable([] as ChatListItem[]);
export const chats$ = writable({} as Record<string, Chat>);

/**
 * User settings
 */
export const userSettings$ = writable({} as UserSettings);

export const userData$ = derived(userSettings$, (userSettings) => {
  const { userId, isUpgraded } = userSettings || {};

  return {
    userId,
    isUpgraded
  };
});
