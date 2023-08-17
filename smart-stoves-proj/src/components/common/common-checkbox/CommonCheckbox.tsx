import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.scss";

type CheckboxProps = {
  label?: string;
  name: string;
  register?: UseFormRegister<FieldValues>;
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CommonCheckbox: React.FC<CheckboxProps> = ({ label, name, register, checked, onChange }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input className={styles.hide} type="checkbox" id={name} {...register?.(name)} checked={checked} onChange={onChange} />
      <span className={styles.checkbox}></span>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default CommonCheckbox;
