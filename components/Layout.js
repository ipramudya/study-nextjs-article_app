import Head from "next/head";

import Nav from "./Nav";
import styles from "@/styles/Layout.module.css";

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <link rel="preload" href="/fonts/BasementGrotesque/BasementGrotesque-Black_v1.202.otf" as="font" />
        <link rel="preload" href="/fonts/Aileron/Aileron-Regular.otf" as="font" />
        <link rel="preload" href="/fonts/Aileron/Aileron-SemiBold.otf" as="font" />
        <link rel="preload" href="/fonts/Aileron/Aileron-Bold.otf" as="font" />
        <title>{title}</title>
      </Head>
      <div className={styles.main}>
        <Nav />
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}

Layout.defaultProps = {
  title: "Minimalism Article ~ Write your wonderful thoughs",
  description: "Article site for sharing thoughs to each other",
};
