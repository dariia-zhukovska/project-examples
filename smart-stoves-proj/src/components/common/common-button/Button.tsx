import React from "react";
import styles from "./styles.module.scss";

type ButtonProps = {
  size: "L" | "M" | "S" | "XS";
  variant: "primary" | "outline" | "secondary" | "link" | "contained";
  state: "default" | "disabled";
  onClick?: (e?: any) => void;
  onSubmit?: () => void;
  type?: "button" | "submit" | "reset";
  placeholder?: string;
  extraSign?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  size,
  variant,
  state,
  type,
  onClick,
  placeholder,
  extraSign,
}) => {
  const buttonClass = `${styles.button} 
  ${styles[`button--${size}`]}
  ${styles[`button--${variant}`]} 
  ${styles[`button--${variant}-${state}`]}`;

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {extraSign && <div className={styles.extraIcon}></div>}
      <div>{placeholder}</div>
    </button>
  );
};

export default Button;
