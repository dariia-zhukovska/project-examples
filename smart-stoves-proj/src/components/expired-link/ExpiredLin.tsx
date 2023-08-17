import { Link } from "react-router-dom";

import expiredLink from "../../assets/svg/expired-link.svg";
import styles from "./styles.module.scss";

const ExpiredLink: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <img src={expiredLink} alt="expired-link-img" />
      <h1>The Link has expired</h1>
      <p>
        To send a new link, go to the{" "}
        <Link to="/auth/reset" className={styles.link}>
          Recovery Password Page
        </Link>
      </p>
    </div>
  );
};

export default ExpiredLink;
