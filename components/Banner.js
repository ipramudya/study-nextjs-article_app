import styles from "../styles/Banner.module.css";

export default function Banner() {
  return (
    <div>
      <h1 className={styles.title}>
        Sharing <br />a simpler thoughts <br /> with less
      </h1>
      <p className={styles.subtitle}>A person of words and not of deeds is like a garden full of weeds.</p>
    </div>
  );
}
