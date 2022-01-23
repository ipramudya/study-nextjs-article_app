import styles from "@/styles/Button.module.css";

export default function Button({ event, buttonType, children, fill, onPending, style }) {
  return (
    <>
      {onPending ? (
        <button style={{ cursor: "not-allowed" }} className={styles.button_fill} disabled>
          {children}
        </button>
      ) : (
        <button className={!fill ? styles.button : styles.button_fill} onClick={event} type={buttonType} style={style}>
          {children}
        </button>
      )}
    </>
  );
}

Button.defaultProps = {
  buttonType: "button",
  onPending: false,
};
