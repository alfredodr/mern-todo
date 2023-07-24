const updateValidate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (
    values.role !== "user" &&
    values.role !== "admin" &&
    values.role !== "credentials"
  ) {
    errors.role = "Choose one of these roles: user, admin, or credentials";
  }

  return errors;
};

export default updateValidate;
