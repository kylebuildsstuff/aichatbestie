/**
 * Formik field validations are passe only one prop, value.
 *
 * If you wish to do validation based on other fields, that must
 * be done in the main validator function.
 */

import { isNil, isEmpty } from 'ramda';

export const isRequired =
  (errorMessage = 'Required') =>
  (value: any) => {
    return (value && !isNil(value) && !isEmpty(value)) || value === 0 || value === false
      ? null
      : errorMessage;
  };

export const isGreaterThan =
  (min: any, errorMessage = 'Must be greater than') =>
  (value: any) =>
    (value || value === 0) && Number(value) <= min ? `${errorMessage} ${min}` : null;

export const isGreaterThanOrEqualTo = (min: number) => (value: any) =>
  (value || value === 0) && Number(value) < min
    ? `Must be greater than or equal to ${min}`
    : null;

export const isLessThanOrEqualTo =
  (max: any, errorMessage = 'Must be less than or equal to') =>
  (value: any) =>
    value && Number(value) > max ? `${errorMessage} ${max}` : null;

export const fitsCharacterLimit =
  (max: any, errorMessage = 'Must not exceed character limit of') =>
  (value: any) =>
    value && value?.length > max ? `${errorMessage} ${max}` : null;
