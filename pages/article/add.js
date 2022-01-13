import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { MdDone } from "react-icons/md";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_URL } from "@/config/urls";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import CustomInput from "@/components/Input";
import styles from "@/styles/Form.module.css";
import articleStyles from "@/styles/Article.module.css";
import moment from "moment";

const initialState = {
  title: "",
  author: "",
  url: "",
  date: "",
  time: "",
  description: "",
  content: "",
};

export default function AddPage() {
  const [values, setValues] = useState(initialState);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate
    const isFieldsEmpty = Object.values(values).some((element) => element === "");
    if (isFieldsEmpty) {
      toast.error("Please fill in all fields", { theme: "dark" });
      return;
    }

    const { date, time, ...others } = values;
    const publishedTime = moment(`${date} ${time}`).format();

    const { status, data } = await axios.post(`${API_URL}/api/articles`, {
      data: {
        ...others,
        publishedTime,
      },
    });
    // setValues(initialState);

    if (status !== 200) toast.error("Error, please try again", { theme: "dark" });

    toast.success("Article Successfully added", {
      theme: "dark",
      onClose: () => router.push(`/article/${data.data.id}`),
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <h1 className={articleStyles.heading_title}>Add your own article {router.query.query}</h1>
      <ToastContainer position="bottom-center" hideProgressBar={true} autoClose={false} transition={Slide} />
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
          Submit your article <MdDone />
        </Button>
      </div>
    </Layout>
  );
}
