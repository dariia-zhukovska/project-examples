import clsx from "clsx";

import { validationMessages } from "../../../../validation/password-validation";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

type InputErrorProps = {
  name: string;
  errors?: any;
  validation?: "singleError" | "password";
};

const InputError: React.FC<InputErrorProps> = ({ name, errors, validation }) => {
  const fieldError = errors?.[name];
  const errorList = fieldError?.types?.matches;

  const [showValidationList, setShowValidationList] = useState(false);

  useEffect(() => {
    if (errorList) {
      setShowValidationList(true);
    }
  }, [errorList]);

  return (
    <>
      {validation === "singleError" && fieldError && (
        <p className={styles.emailError}>
          <span className={styles.errorIcon}></span>
          <span className={styles.message}>{fieldError.message}</span>
        </p>
      )}

      {validation === "password" && showValidationList && (
        <div className={styles.passwordErrorContainer}>
          {validationMessages.map((message) => (
            <p
              key={message}
              className={clsx(styles.successMessage, {
                [styles.errorMessage]: errorList?.includes(message),
              })}>
              {errorList?.includes(message) ? (
                <span className={styles.errorPasswordIcon}></span>
              ) : (
                <span className={styles.successPasswordIcon}></span>
              )}
              <span className={styles.message}>{message}</span>
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default InputError;
