export const adminValidate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
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

  if (values.actions === "Actions") {
    errors.actions = "Please select an action";
  }

  return errors;
};
