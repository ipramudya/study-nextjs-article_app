import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/components/Layout";
import Form from "@/components/Form";
import articleStyles from "@/styles/Article.module.css";
import axios from "axios";
import { API_URL } from "@/config/urls";
import moment from "moment";

export default function EditPage({ article }) {
  const { title, author, url, description, content, publishedTime } = article.attributes;
  const date = moment(publishedTime).format("YYYY-MM-DD");
  const time = moment(publishedTime).format("HH:mm");
  const [values, setValues] = useState({
    title,
    author,
    url,
    date,
    time,
    description,
    content,
  });
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
    const { status, data } = await axios.put(`${API_URL}/api/articles/${article.id}`, {
      data: {
        ...others,
        publishedTime,
      },
    });

    if (status !== 200) toast.error("Error, please try again", { theme: "dark" });

    toast.success("Article successfully edited", {
      theme: "dark",
      onClose: () => router.push(`/article/${article.id}`),
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
    <>
      <Layout>
        <h1 className={articleStyles.heading_title}>Edit the article</h1>
        <ToastContainer position="bottom-center" hideProgressBar={true} autoClose={3000} transition={Slide} />
        <Form buttonMessage="Edit" values={values} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const {
    data: { data: article },
  } = await axios.get(`${API_URL}/api/articles/${id}`);

  return {
    props: { article },
  };
}
