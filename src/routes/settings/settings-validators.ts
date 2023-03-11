import { compileFormErrors, validateFieldValue } from '$lib/shared/form/form-utils';
import { isRequired } from '$lib/shared/form/form-validators';

import type { ChangePasswordFormValues } from './settings.type';

// export const validateProfileForm = (formValues: ProfileFormValues) => {
//   const { displayName } = formValues || {};

//   const displayNameErrors = validateFieldValue(displayName, [isRequired('Required')], null);

//   return compileFormErrors({
//     displayName: displayNameErrors
//   });
// };

export const validateChangePasswordForm = (formValues: ChangePasswordFormValues) => {
  const { password } = formValues || {};

  const passwordErrors = validateFieldValue(password, [isRequired('Required')], null);

  return compileFormErrors({
    password: passwordErrors
  });
};
