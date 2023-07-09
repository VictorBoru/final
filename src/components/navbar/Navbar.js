import styles from './styles.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <Link href="/newquestion">New Question</Link>
    </div>
  );
};

export default Navbar;