export const userFields = `
id
createdAt
updatedAt
lastSeen
disabled
email
emailVerified`;

export const userSettingsFields = `
userId
isUpgraded`;

export const savedChatsFields = `
id
userId
chats
createdAt
updatedAt`;

/**
 * //////////////////////////////////////////////////////////
 * QUERIES ==================================================
 * //////////////////////////////////////////////////////////
 */
export const USER_DATA = `
  query FetchUserSettings (
    $userId: uuid!
  ) {
    user(id: $userId) {
      ${userFields}
    }

    userSettingsByPk(userId: $userId) {
      ${userSettingsFields}
    }

    savedChats(where: {
      userId: {_eq: $userId}
    }) {
      ${savedChatsFields}
    }
  }
`;

export const FETCH_SAVED_CHATS = `
  query FetchUserChats (
    $userId: uuid!
  ) {
    savedChats(
      where: {
        userId: {_eq: $userId}
      }
    ) {
      ${savedChatsFields}
    }
  }`;

/**
 * //////////////////////////////////////////////////////////
 * MUTATIONS ================================================
 * //////////////////////////////////////////////////////////
 */
export const CREATE_USER_SETTINGS = `
  mutation CreateUserSettings (
    $userId: uuid!
  ) {
    insertUserSettingsOne(
      object: {userId: $userId},
      on_conflict: {
        constraint: user_settings_pkey,
        update_columns: []
      }
    ) {
      ${userSettingsFields}
    }
  }
`;

export const SAVE_USER_CHATS = `
  mutation SaveChats (
    $userId: uuid!,
    $chats: jsonb!
  ) {
    insertSavedChatsOne(
      object: {
        userId: $userId,
        chats: $chats
      }
    ) {
      ${savedChatsFields}
    }
  }`;

export const UPDATE_USER_SAVED_CHATS = `
mutation UpdateUserSavedChats (
  $savedChatId: uuid!,
  $chats: jsonb!
) {
  updateSavedChatsByPk(
    pk_columns: {id: $savedChatId},
    _set: {chats: $chats}
  ) {
    ${savedChatsFields}
  }
}`;
