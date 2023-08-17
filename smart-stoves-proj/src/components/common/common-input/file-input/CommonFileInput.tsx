import { FieldErrors } from "react-hook-form";

import { MouseEventHandler } from "react";

type InputProps = {
  name: string;
  type: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: FieldErrors;
  validation?: "singleError" | "password";
  accept?: string;
  fieldError?: boolean;
  fieldSuccess?: boolean;
  inputRefProp: any;
};

const CommonFileInput: React.FC<InputProps> = ({
  accept,
  onClick,
  onChange,
  inputRefProp,
}) => {
  return (
    <>
      <input
        type="file"
        ref={inputRefProp}
        accept={accept}
        onClick={onClick}
        onChange={onChange}
      />
    </>
  );
};

export default CommonFileInput;
