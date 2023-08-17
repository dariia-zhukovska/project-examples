import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues, FieldErrors } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Button from "../common/common-button/Button";
import CommonInput from "../common/common-input/CommonInput";
import CommonCheckbox from "../common/common-checkbox/CommonCheckbox";
import { areFieldsEmpty } from "../../helpers/loginFormHelpers";
import { validationSchema } from "../../validation/login-validation";
import { yupResolver } from "@hookform/resolvers/yup";

import passwordShowSvg from "../../assets/svg/password-show.svg";
import passwordHideSvg from "../../assets/svg/password-hide.svg";

import { useLoginMutation } from "../../store/usersAuth/api";

import styles from "./styles.module.scss";

import { toast } from "react-toastify";
import { errorToast } from "../common/toast/Toast";

const LoginForm: React.FC = () => {
  const [error, setError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [loginMutation, { isSuccess, isError }] = useLoginMutation();
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onChange",
    resolver: yupResolver<FieldValues>(validationSchema),
  });

  const fields = getValues();

  const onSubmit: SubmitHandler<FieldValues> = (userCredentials) => {
    if (areFieldsEmpty(userCredentials)) {
      if (!toast.isActive("reqiredData")) {
        toast.error("Please fill in all required data", {
          ...errorToast,
          toastId: "reqiredData",
        });
      }
      setError(true);
    } else {
      loginMutation(userCredentials);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/main");
    }

    if (isError && !areFieldsEmpty(fields)) {
      if (!toast.isActive("invalidCredentials")) {
        toast.error("Email or Password is not valid. Please, check provided information", {
          ...errorToast,
          toastId: "invalidCredentials",
        });
      }
    }
  }, [isSuccess, isError]);

  const onError = (errors: FieldErrors) => {
    if (errors && areFieldsEmpty(fields)) {
      if (!toast.isActive("reqiredData")) {
        toast.error("Please fill in all required data", {
          ...errorToast,
          toastId: "reqiredData",
        });
      }
    }
  };

  const onKeyDown = () => {
    setError(false);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit, onError)}>
      <h1 className={styles.heading}>Sign In</h1>

      <div className={styles.emailInput}>
        <CommonInput
          name="email"
          label="Email"
          type="text"
          placeholder="Enter your email address"
          register={register}
          validation="singleError"
          errors={errors}
          fieldError={isError || getValues("email") === "" || !!errors?.email}
        />
      </div>

      <div className={styles.passwordInput}>
        <CommonInput
          name="password"
          label="Password"
          type={hidePassword ? "password" : "text"}
          placeholder="Enter your password"
          register={register}
          onKeyDown={onKeyDown}
          fieldError={isError || error}
        />
        <img
          className={styles.passwordIcon}
          src={hidePassword ? passwordShowSvg : passwordHideSvg}
          onClick={() => setHidePassword(!hidePassword)}
          alt="show password"
        />
      </div>

      <div className={styles.loginOptions}>
        <CommonCheckbox
          label="Remember me"
          name="remember_me"
          register={register}
          checked={rememberMe}
          onChange={handleCheckboxChange}
        />

        <Link to={"/auth/reset"} className={styles.forgotPassword}>
          Forgot a password?
        </Link>
      </div>

      <div className={styles.button}>
        <Button size="L" variant="primary" state="default" placeholder="Sign In" />
      </div>
    </form>
  );
};

export default LoginForm;
