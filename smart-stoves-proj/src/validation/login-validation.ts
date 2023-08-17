import * as yup from "yup";

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .test(function (
      value
    ) {
      const { path, createError } = this;
      if (value && value.trim() !== "") {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value) ||
          value === ""
          ? true
          : createError({ path, message: "This email does not appear to be valid" });
      }

      return true;
    }),
});
