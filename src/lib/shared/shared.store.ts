import { derived, writable } from 'svelte/store';

import type {
  Chat,
  ChatListItem,
  SavedPrompt,
  User,
  UserSettings
} from './shared.type';

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
export const savedPrompts$ = writable([] as SavedPrompt[]);

/**
 * User data
 */
export const user$ = writable({} as User);
export const userSettings$ = writable({} as UserSettings);
// Store only one savedChat per user for now
export const savedChats$ = writable([] as Chat[]);

export const userId$ = derived(user$, (user) => {
  return user?.id;
});

export const isSignedIn$ = derived(user$, (user) => {
  return !!user?.id;
});

export const isUpgraded$ = derived(userSettings$, (userSettings) => {
  return !!userSettings?.isUpgraded;
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

// [ { chatId: string, messages: Message[] title: string } ]
export const chatsWithTitles$ = derived([chats$, chatList$], ([chats, chatList]) => {
  return Object.values(chats).map((chat) => {
    const chatListItem = chatList.find((item) => item.chatId === chat.chatId);

    return {
      ...chat,
      title: chatListItem?.title || 'New chat'
    };
  });
});
