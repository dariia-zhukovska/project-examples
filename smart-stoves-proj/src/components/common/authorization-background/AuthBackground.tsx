import { ReactNode } from "react";
import authPhoto from "../../../assets/images/auth-photo.png";
import amityLogo from "../../../assets/svg/amity-logo.svg";

import styles from "./styles.module.scss";

interface AuthBackgroundProps {
  children: ReactNode;
}

const AuthBackground: React.FC<AuthBackgroundProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.backgroundImage} src={authPhoto} alt="backgroundImage" />
      <img className={styles.backgroundLogo} src={amityLogo} alt="amityLogo" />
      {children}
    </div>
  );
};

export default AuthBackground;
