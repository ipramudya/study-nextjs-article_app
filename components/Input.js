import styles from "@/styles/Form.module.css";

export default function Input({ type, label = "", ph, value, handleValue, inputType = "text", style }) {
  return (
    <div className={styles.form_input_wrapper} style={style}>
      <label htmlFor={label.toLowerCase()} className={styles.input_label}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={label.toLowerCase()}
          name={label.toLowerCase()}
          value={value}
          onChange={handleValue}
          placeholder={ph}
          className={`${styles.form_input} ${styles.form_desc}`}
        />
      ) : (
        <input
          id={label.toLowerCase()}
          name={label.toLowerCase()}
          type={inputType}
          value={value}
          onChange={handleValue}
          placeholder={ph}
          className={styles.form_input}
        />
      )}
    </div>
  );
}
