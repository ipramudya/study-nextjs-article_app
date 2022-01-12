import styles from "@/styles/Button.module.css";

export default function Button({ event, buttonType, children }) {
  return (
    <button className={styles.button} onClick={event} type={buttonType}>
      {children}
    </button>
  );
}
