import Link from "next/link";

import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";

export default function NotFound() {
  return (
    <Layout>
      <div className={styles.error}>
        <h3 className={styles.error_message}>You&#39;ve found a page that doesn&#39;t exist </h3>
        <p className={styles.error_desc}>
          The page you were looking for has either been removed or it really doesn&#39;t exist.
          <br /> Breathe in, and on the out breath,{" "}
          <Link href="/">
            <a>go back</a>
          </Link>{" "}
          and try again : &#41;
        </p>
      </div>
    </Layout>
  );
}
