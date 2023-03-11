import { derived, writable } from 'svelte/store';

import type { Chat, ChatListItem, User, UserSettings } from './shared.type';

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
export const user$ = writable({} as User);
export const userSettings$ = writable({} as UserSettings);

export const isSignedIn$ = derived(user$, (user) => {
  return !!user?.id;
});

export const userData$ = derived([user$, userSettings$], ([user, userSettings]) => {
  const { createdAt, updatedAt, lastSeen, disabled, email, emailVerified } = user || {};
  const { userId, isUpgraded } = userSettings || {};

  return {
    userId,
    createdAt,
    updatedAt,
    lastSeen,
    disabled,
    email,
    emailVerified,
    isUpgraded
  };
});
