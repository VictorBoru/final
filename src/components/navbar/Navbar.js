import styles from './styles.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div>
        <Link href="/">
          Home
        </Link>
        <Link href="/newquestion">
          New Question
        </Link>
      </div>
      <div>
        <Link href="/registration">
          Register
        </Link>
        <Link href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;