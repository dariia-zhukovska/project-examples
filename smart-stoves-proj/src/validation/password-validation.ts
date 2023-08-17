import * as yup from "yup";

export const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required(),

  password: yup
    .string()
    .notOneOf([yup.ref("currentPassword"), null], "A new password can't be equal to the previous password")
    .matches(/^.{8,}$/, "At least 8 characters")
    .matches(/[a-z]/, "Includes at least 1 lower case character")
    .matches(/[A-Z]/, "Includes at least 1 upper case character")
    .matches(/[^A-Za-z0-9\s]/, "Includes at least 1 special character")
    .matches(/^[^\s]+$/, "Spaces are not allowed in the password")
    .matches(/[0-9]/, "Includes at least 1 number")

  ,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords don't match"),
});

export const validationMessages = [
  "At least 8 characters",
  "Includes at least 1 lower case character",
  "Includes at least 1 upper case character",
  "Includes at least 1 special character",
  "Includes at least 1 number",
];
