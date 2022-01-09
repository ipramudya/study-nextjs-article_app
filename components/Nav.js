import Link from "next/link";
import styles from "@/styles/Nav.module.css";

export default function Nav() {
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
            <Link href="/items">articles</Link>
          </li>
          <li className={styles.nav_item}>
            <Link href="/about">about</Link>
          </li>
          <li className={styles.nav_item}>
            <Link href="/login">login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
