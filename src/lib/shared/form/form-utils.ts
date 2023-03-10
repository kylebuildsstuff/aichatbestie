export const validateFieldValue = (fieldValue: any, validationRules: any, skipValidation: any) => {
  if (skipValidation) {
    return null;
  }

  const errors = validationRules.reduce((allErrors, validationRule) => {
    return validationRule(fieldValue) ? allErrors.concat(validationRule(fieldValue)) : allErrors;
  }, []);

  return errors[0] || null;
};

export const compileFormErrors = (errors) => {
  return Object.entries(errors).reduce((accumulator, [key, value]) => {
    if (value) {
      accumulator[key] = value;
    }
    return accumulator;
  }, {});
};
