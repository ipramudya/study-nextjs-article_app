import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import moment from "moment";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_URL } from "@/config/urls";
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import articleStyles from "@/styles/Article.module.css";
import formStyles from "@/styles/Form.module.css";

export default function EditPage({ article }) {
  const { title, author, url, description, content, publishedTime } = article.attributes;
  const { data: image } = article.attributes.image;
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
  const [imageUrl, setImageUrl] = useState(image ? image.attributes.formats.medium.url : "");
  const [isModalShown, setIsModalShown] = useState(false);
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
    // Result
    if (status !== 200) toast.error("Error, please try again", { theme: "dark" });
    toast.success("Article successfully edited", {
      theme: "dark",
      onClose: () => router.push(`/article/${article.id}`),
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Set state
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (newUploadedImage) => {
    setImageUrl(newUploadedImage.formats.medium.url);
    setIsModalShown(false);
  };

  return (
    <>
      <Layout>
        <h1 className={articleStyles.heading_title}>Edit the article</h1>
        <ToastContainer position="bottom-center" hideProgressBar={true} autoClose={3000} transition={Slide} />
        <div className={formStyles.form_image}>
          <span className={formStyles.input_label}>Image</span>
          <button className={formStyles.input_btn} onClick={() => setIsModalShown(true)}>
            <MdOutlineAddPhotoAlternate />
            change image
          </button>
        </div>
        <div style={{ padding: "1rem 0" }}>
          <div className={articleStyles.article_image}>
            <Image
              src={
                imageUrl
                  ? imageUrl
                  : "https://res.cloudinary.com/pramudya-dev/image/upload/v1641964049/large_default_image_aa09a36476.jpg"
              }
              alt="image"
              priority
              layout="fill"
              quality={100}
              objectFit="cover"
            />
          </div>
        </div>
        <Form buttonMessage="Edit" values={values} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        <Modal show={isModalShown} onClose={() => setIsModalShown(false)}>
          <ImageUpload articleId={article.id} onImageUploaded={handleImageChange} />
        </Modal>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params: { id } }, req) {
  const {
    data: { data: article },
  } = await axios.get(`${API_URL}/api/articles/${id}?populate=image`);

  return {
    props: { article },
  };
}
