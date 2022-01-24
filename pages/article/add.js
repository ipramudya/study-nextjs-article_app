import { useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { parseCookie } from "@/helpers/parseCookies";
import { API_URL } from "@/config/urls";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import articleStyles from "@/styles/Article.module.css";
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

export default function AddPage({ token }) {
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
    try {
      const { data } = await axios.post(
        `${API_URL}/api/articles`,
        {
          data: {
            ...others,
            publishedTime,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  success
      toast.success("Article successfully added", {
        theme: "dark",
        onClose: () => router.push(`/article/${data.data.id}`),
      });
    } catch (error) {
      //  error handling
      const { status } = error.response.data.error;
      if (status !== 200) {
        if (status === 402 || status === 401) {
          return toast.error("Forbidden, no token included", { theme: "dark" });
        }
        toast.error("Error, please try again", { theme: "dark" });
      }
    }
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

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  return {
    props: {
      token,
    },
  };
}
