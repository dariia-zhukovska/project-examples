import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { validationSchema } from "../../validation/password-validation";
import CommonInput from "../common/common-input/CommonInput";
import Button from "../common/common-button/Button";

import passwordShowSvg from "../../assets/svg/password-show.svg";
import passwordHideSvg from "../../assets/svg/password-hide.svg";

import styles from "./styles.module.scss";
import { successToast } from "../common/toast/Toast";

const NewPasswordForm: React.FC = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirmation, setHidePasswordConfirmation] =
    useState(true);
  const navigate = useNavigate();

  const {
    register,
    trigger,
    handleSubmit,
    getValues,
    formState: { errors, isDirty },
  } = useForm<FieldValues>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver<FieldValues>(validationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = () => {
    if (getValues("password") === getValues("passwordConfirmation")) {
      toast.success(
        "Your password has been successfully created!",
        successToast
      );
      // succesToast for recovery password

      // toast.success(
      //   "Your password has been successfully reset!",
      //   successToast
      // );

      // api call backend
      navigate("/auth/sign-in");
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") event.preventDefault();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.heading}>
        Create a{""}
        <span className={styles.headingPrimaryColor}> New Password</span>
      </h1>

      <div className={styles.inputsBlock}>
        <div className={styles.passwordInput}>
          <CommonInput
            name="password"
            label="New Password"
            type={hidePassword ? "password" : "text"}
            register={register}
            trigger={trigger}
            errors={errors}
            validation={isDirty ? "password" : undefined}
            fieldError={isDirty && !!errors.password}
            onKeyDown={onKeyDown}
          />
          <img
            className={styles.passwordIcon}
            src={hidePassword ? passwordShowSvg : passwordHideSvg}
            onClick={() => setHidePassword(!hidePassword)}
            alt="show password"
          />
        </div>

        <div className={styles.passwordInput}>
          <CommonInput
            name="passwordConfirmation"
            label="Confirm New Password"
            type={hidePasswordConfirmation ? "password" : "text"}
            register={register}
            errors={errors}
            validation="singleError"
            fieldError={!!errors.passwordConfirmation}
            onKeyDown={onKeyDown}
          />
          <img
            className={styles.passwordIcon}
            src={hidePasswordConfirmation ? passwordShowSvg : passwordHideSvg}
            onClick={() =>
              setHidePasswordConfirmation(!hidePasswordConfirmation)
            }
            alt="show password"
          />
        </div>
      </div>

      <div className={styles.buttonsBlock}>
        <Button
          size="L"
          variant="primary"
          state="default"
          placeholder="Submit"
        />
        <Link to="/auth/sign-in">
          <Button
            size="L"
            variant="outline"
            state="default"
            placeholder="Back to Sign In"
          />
        </Link>
      </div>
    </form>
  );
};

export default NewPasswordForm;
