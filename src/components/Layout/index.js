import Link from 'next/link';
import styles from './Layout.module.scss';

const Layout = ({ children }) => (
  <div className={styles.Layout}>
    <nav>
      <span>
        <Link href="/">My Next.js Blog</Link>
      </span>
    </nav>
    <main>{children}</main>
  </div>
);

export default Layout;
