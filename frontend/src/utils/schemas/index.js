import * as yup from "yup";

//users

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const userSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .max(20)
    .matches(passwordRules, {
      message:
        "min 8 characters, max 9 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Required"),
});

export const adminSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  role: yup
    .string()
    .oneOf(
      ["user", "admin", "credentials"],
      "Choose one of these roles: user, admin, or credentials"
    )
    .required("Required"),
  actions: yup.string().required("Please select an action"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .max(20)
    .matches(passwordRules, {
      message:
        "min 8 characters, max 9 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.",
    })
    .required("Required"),
});

export const requestResetSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .max(20)
    .matches(passwordRules, {
      message:
        "min 8 characters, max 9 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Required"),
});

export const updateProfileSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  role: yup
    .string()
    .oneOf(
      ["user", "admin", "credentials"],
      "Choose one of these roles: user, admin, or credentials"
    )
    .required("Required"),
});

export const updatePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8)
    .max(20)
    .matches(passwordRules, {
      message:
        "min 8 characters, max 9 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.",
    })
    .required("Required"),
  newPassword: yup
    .string()
    .min(8)
    .max(20)
    .matches(passwordRules, {
      message:
        "min 8 characters, max 9 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.",
    })
    .required("Required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords do not match")
    .required("Required"),
});

//todos

export const addTodoSchema = yup.object().shape({
  newTask: yup.string().required("New task is required"),
});

export const editTodoSchema = yup.object().shape({
  task: yup.string().required("Task is required"),
});
