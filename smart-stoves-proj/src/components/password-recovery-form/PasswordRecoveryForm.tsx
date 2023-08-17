import { useForm, SubmitHandler, FieldValues, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationSchema } from "../../validation/email-validation";
import CommonInput from "../common/common-input/CommonInput";
import Button from "../common/common-button/Button";
import Timer from "../timer/Timer";

import styles from "./styles.module.scss";
import { usePasswordRecoveryMutation } from "../../store/usersAuth/api";

const PasswordRecoveryForm: React.FC = () => {
  const [timerValue, setTimerValue] = useState(0);
  const [emailSentMode, setEmailSentMode] = useState(false);

  const [passwordRecovery, { isSuccess, isError }] =
    usePasswordRecoveryMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver<FieldValues>(validationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setEmailSentMode(true);
    // api call backend
    passwordRecovery(data?.email);
    resetTimer();
  };

  const resetTimer = () => {
    setTimerValue(60);
  };

  const emailFieldValue = useWatch({
    control,
    name: "email",
  });

  useEffect(() => {
    setEmailSentMode(false);
  }, [emailFieldValue]);

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1 className={styles.heading}>
          <span className={styles.headingPrimaryColor}>Password</span> Recovery
        </h1>
        <p className={styles.description}>
          Please enter your email, and we will send you further instructions.
        </p>
      </div>

      <div className={styles.emailInput}>
        <CommonInput
          name="email"
          label="Email"
          type="text"
          register={register}
          errors={errors}
          validation="singleError"
          fieldError={!!errors?.email || (emailSentMode && isError)}
          fieldSuccess={emailSentMode && isSuccess}
        />
        {emailSentMode && isSuccess && (
          <p className={styles.inputMessage}>
            Email sent. Please check your email to reset your password.
          </p>
        )}
        {emailSentMode && isError && (
          <p className={styles.inputErrorMessage}>
            There is no account with that name.
          </p>
        )}
      </div>
      <div className={styles.buttonsBlock}>
        <Button
          size="L"
          variant="primary"
          state={emailSentMode && timerValue > 0 ? "disabled" : "default"}
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
      {emailSentMode && (
        <div>
          <div className={styles.dividingStrokesContainer}>
            <div className={styles.dividingStroke}></div>
            <div className={styles.dividingStroke}></div>
          </div>
          <p className={styles.timerMessage}>
            Email sent. If you didn't receive the message try again in{" "}
            <Timer setTimerValue={setTimerValue} timerValue={timerValue} />
          </p>
          <Button
            size="L"
            variant="link"
            state={timerValue > 0 ? "disabled" : "default"}
            placeholder="Send Again"
            onSubmit={() => onSubmit}
          />
        </div>
      )}
    </form>
  );
};

export default PasswordRecoveryForm;
