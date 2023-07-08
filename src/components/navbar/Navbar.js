import styles from './styles.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/">
        </a>
      </div>
      <div className={styles.navlinks}>
        <a href="/">Home</a>
        <a href="/newQuestion">Ask a question</a>
      </div>
    </div>
  );
};

export default Navbar;