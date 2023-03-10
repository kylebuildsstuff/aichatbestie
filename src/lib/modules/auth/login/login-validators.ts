import { compileFormErrors, validateFieldValue } from '$lib/shared/form/form-utils';
import { isRequired } from '$lib/shared/form/form-validators';

import type { LoginFormValues } from './login.type';

export const validateLoginForm = (formValues: LoginFormValues) => {
  const { email, password } = formValues;

  const emailErrors = validateFieldValue(email, [isRequired('Required')], null);
  const passwordErrors = validateFieldValue(password, [isRequired('Required')], null);

  return compileFormErrors({
    email: emailErrors,
    password: passwordErrors
  });
};
