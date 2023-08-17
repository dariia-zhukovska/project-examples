import styles from "./styles.module.scss";

const Loader: React.FC = () => {
  return (
    <section className={styles.loading}>
      <div className={styles.loader}></div>
    </section>
  );
};

export default Loader;
