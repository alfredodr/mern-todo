export const resetValidate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "password";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater than 8 and less than 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
};
