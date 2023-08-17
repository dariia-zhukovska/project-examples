import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";
import clsx from "clsx";
import styles from "./styles.module.scss";
import InputError from "./input-error/InputError";

type InputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  register: UseFormRegister<FieldValues>;
  trigger?: UseFormTrigger<FieldValues>;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: FieldErrors;
  validation?: "singleError" | "password";
  fieldError?: boolean;
  fieldSuccess?: boolean;
};

const CommonInput: React.FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  register,
  trigger,
  onKeyDown,
  errors,
  validation,
  fieldError,
  fieldSuccess = false,
}) => {
  return (
    <>
      <label
        className={clsx(styles.label, {
          [styles["label--error"]]: fieldError,
          [styles["label--success"]]: !!fieldSuccess,
        })}
        htmlFor={name}
      >
        {label}
      </label>

      <input
        className={clsx(styles.input, {
          [styles["input--error"]]: fieldError,
          [styles["input--success"]]: fieldSuccess === true,
        })}
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        defaultValue={defaultValue}
        onClick={() => {
          trigger && trigger(name);
        }}
        onKeyDown={onKeyDown}
      />
      {errors && (
        <InputError name={name} errors={errors} validation={validation} />
      )}
    </>
  );
};

export default CommonInput;
