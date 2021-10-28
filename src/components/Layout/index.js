import Link from 'next/link';
import { useAuth } from '../../contexts/auth';
import { signOut } from '../../lib/firebase';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  const [user] = useAuth();

  return (
    <div className={styles.Layout}>
      <nav>
        <span>
          <Link href='/'>My Next.js Blog</Link>
        </span>
        {user && (
          <span>
            <button onClick={() => signOut()}>Sign Out</button>
          </span>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
