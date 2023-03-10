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

/**
 * //////////////////////////////////////////////////////////
 * QUERIES ==================================================
 * //////////////////////////////////////////////////////////
 */
export const fetchUserSettingsQuery = `
  query FetchUserSettings (
    $userId: uuid!
  ) {
    userSettingsByPk(userId: $userId) {
      ${userSettingsFields}
    }
  }
`;

/**
 * //////////////////////////////////////////////////////////
 * MUTATIONS ================================================
 * //////////////////////////////////////////////////////////
 */

export const createUserSettingsQuery = `
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
