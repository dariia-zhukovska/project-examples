import styles from "./styles.module.scss";

import { NavLink } from "react-router-dom";

interface TabProps {
  path: string;
  tabName: string;
  onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ path, tabName, onClick }) => {
  return (
    <>
      <div className={styles.tab}>
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive ? `${styles.active}` : `${styles.unActive}`
          }
          onClick={onClick}
        >
          {tabName}
        </NavLink>
      </div>
    </>
  );
};

export default Tab;
