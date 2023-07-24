const updatePasswordValidate = (values) => {
  const errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "Required";
  } else if (
    values.currentPassword.length < 8 ||
    values.currentPassword.length > 20
  ) {
    errors.currentPassword =
      "Must be greater than 8 and less than 20 characters long";
  } else if (values.currentPassword.includes(" ")) {
    errors.currentPassword = "Invalid Password";
  }

  if (!values.newPassword) {
    errors.newPassword = "Required";
  } else if (values.newPassword.length < 8 || values.newPassword.length > 20) {
    errors.newPassword =
      "Must be greater than 8 and less than 20 characters long";
  } else if (values.newPassword.includes(" ")) {
    errors.newPassword = "Invalid Password";
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = "Required";
  } else if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = "Passwords Do Not Match";
  } else if (values.confirmNewPassword.includes(" ")) {
    errors.confirmNewPassword = "Invalid Confirm Password";
  }

  return errors;
};

export default updatePasswordValidate;
