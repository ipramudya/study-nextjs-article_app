import styles from "@/styles/Button.module.css";

export default function Button({ event, buttonType, children, fill }) {
  return (
    <button className={!fill ? styles.button : styles.button_fill} onClick={event} type={buttonType}>
      {children}
    </button>
  );
}
