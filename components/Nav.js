import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/Nav.module.css";

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_inner}>
        <div className={styles.nav_logo}>
          <Link href="/">
            <a className={styles.logo}>rémark</a>
          </Link>
        </div>
        <ul className={styles.nav_links}>
          <li className={styles.nav_item}>
            <Link href="/">feeds</Link>
          </li>
          {user ? (
            //  If logged in
            <>
              <li className={styles.nav_item}>
                <Link href="/article/add">post</Link>
              </li>
              <li className={styles.nav_item}>
                <Link href="/account/dashboard">mine</Link>
              </li>
              <li className={styles.nav_item}>
                <button
                  className={styles.nav_btn}
                  onClick={logout}
                  style={{ textDecoration: "underline", marginTop: "8px" }}
                >
                  logout
                </button>
              </li>
            </>
          ) : (
            //  If logged out
            <>
              <li className={styles.nav_item} style={{ textDecoration: "underline", marginTop: "8px" }}>
                <Link href="/account/login">login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
