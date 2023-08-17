import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .trim()
    .matches(/^[A-Za-z][A-Za-z']*$/, "First name must start with a letter and can only contain letters and apostrophes")
    .transform((_, originalValue) => originalValue.charAt(0).toUpperCase() + originalValue.slice(1)),
  lastName: yup
    .string()
    .required("Last name is required")
    .trim()
    .matches(/^[A-Za-z][A-Za-z']*$/, "Last name must start with a letter and can only contain letters and apostrophes")
    .transform((_, originalValue) => originalValue.charAt(0).toUpperCase() + originalValue.slice(1)),
});