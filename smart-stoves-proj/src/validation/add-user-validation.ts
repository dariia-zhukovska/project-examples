import * as yup from "yup";

export const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required").trim(),
    lastName: yup.string().required("Last name is required").trim(),
    email: yup
        .string()
        .required("Email is requiered")
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
    phone: yup
        .string()
        .matches(/^(?:\d+-)*\d+$/, "Please enter a valid Phone number")
        .max(12, "Please enter a valid Phone number")
        .trim(),
});
