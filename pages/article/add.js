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
import Form from "@/components/Form";

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

    // Spliting data to parse date
    const { date, time, ...others } = values;
    const publishedTime = moment(`${date} ${time}`).format();

    // Api call
    const { status, data } = await axios.post(`${API_URL}/api/articles`, {
      data: {
        ...others,
        publishedTime,
      },
    });

    if (status !== 200) toast.error("Error, please try again", { theme: "dark" });

    toast.success("Article successfully added", {
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
      <h1 className={articleStyles.heading_title}>Post your own article {router.query.query}</h1>
      <ToastContainer position="bottom-center" hideProgressBar={true} autoClose={3000} transition={Slide} />
      <div className={styles.form}>
        <Form
          values={values}
          buttonMessage="Submit your article"
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
}
