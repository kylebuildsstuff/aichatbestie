import { compileFormErrors, validateFieldValue } from '$lib/shared/form/form-utils';
import { isRequired } from '$lib/shared/form/form-validators';

import type { RegisterFormValues } from './register.type';

export const validateRegisterForm = (formValues: RegisterFormValues) => {
  const { email, password } = formValues;

  const emailErrors = validateFieldValue(email, [isRequired('Required')], null);
  const passwordErrors = validateFieldValue(password, [isRequired('Required')], null);

  return compileFormErrors({
    email: emailErrors,
    password: passwordErrors
  });
};
