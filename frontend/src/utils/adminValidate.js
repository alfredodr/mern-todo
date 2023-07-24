// export const adminValidate = (values) => {
//   const errors = {};

//   if (!values.users) {
//     errors.users = "No users provided";
//   } else {
//     values.users.forEach((user, index) => {
//       if (!user.name) {
//         errors.users = errors.users || [];
//         errors.users[index] = errors.users[index] || {};
//         errors.users[index].name = "Required";
//       }

//       if (!user.email) {
//         errors.users = errors.users || [];
//         errors.users[index] = errors.users[index] || {};
//         errors.users[index].email = "Required";
//       } else if (
//         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)
//       ) {
//         errors.users = errors.users || [];
//         errors.users[index] = errors.users[index] || {};
//         errors.users[index].email = "Invalid email address";
//       }

//       if (
//         user.role !== "user" &&
//         user.role !== "admin" &&
//         user.role !== "credentials"
//       ) {
//         errors.users = errors.users || [];
//         errors.users[index] = errors.users[index] || {};
//         errors.users[index].role =
//           "Choose one of these roles: user, admin, or credentials";
//       }
//     });
//   }

//   return errors;
// };

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

  return errors;
};
