import { MdDone } from "react-icons/md";
import CustomInput from "@/components/Input";
import Button from "./Button";
import styles from "@/styles/Form.module.css";

export default function Form({ values, handleInputChange, handleSubmit, buttonMessage }) {
  return (
    <div className={styles.form}>
      <div className={styles.form_divider_3}>
        <CustomInput
          type="input"
          label="Title"
          value={values.title}
          handleValue={handleInputChange}
          ph="add your title"
        />
        <CustomInput
          type="input"
          label="Author"
          value={values.author}
          handleValue={handleInputChange}
          ph="who's the author ?"
        />
        <CustomInput
          type="input"
          label="Url"
          value={values.url}
          handleValue={handleInputChange}
          ph="link to the article"
        />
      </div>
      <div className={styles.form_divider_2}>
        <CustomInput inputType="date" type="input" label="Date" value={values.date} handleValue={handleInputChange} />
        <CustomInput
          inputType="time"
          type="input"
          label="Time"
          value={values.time}
          handleValue={handleInputChange}
          ph="when it happened ?"
        />
      </div>
      <div className={styles.form_divider_2}>
        <CustomInput
          type="textarea"
          label="Description"
          value={values.description}
          handleValue={handleInputChange}
          ph="write short description"
        />
        <CustomInput
          type="textarea"
          label="Content"
          value={values.content}
          handleValue={handleInputChange}
          ph="write the whole content"
        />
      </div>
      <Button buttonType="submit" event={handleSubmit} fill>
        {buttonMessage} <MdDone />
      </Button>
    </div>
  );
}
