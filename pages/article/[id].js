import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/urls";
import styles from "@/styles/Article.module.css";

export default function Article({ article }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleEdit = () => {
    router.push(`/edit/${article.id}`);
  };

  const handleRemove = async () => {
    const { status } = await axios.delete(`${API_URL}/api/articles/${article.id}`);

    if (status !== 200) {
      toast.error("Error, please try again", { theme: "dark" });
    }

    toast.success("Article successfully removed", {
      theme: "dark",
      onClose: () => router.push("/"),
    });
  };

  return (
    <Layout>
      <ToastContainer position="bottom-center" hideProgressBar={true} autoClose={3000} transition={Slide} />
      {
        // if user exist, then show the article handler
        user && (
          <div className={styles.handler_group}>
            <button className={styles.handler_button} onClick={handleEdit}>
              <AiOutlineEdit /> edit article
            </button>
            <button className={styles.handler_button} onClick={handleRemove}>
              <AiOutlineClose /> delete article
            </button>
          </div>
        )
      }
      <div className={styles.article_heading}>
        <div className={styles.heading_group}>
          <span>posted at &ndash; {moment(article.attributes.publishedAt).format("LL")}</span>
          <span className={styles.heading_link}>
            <a href={article.attributes.url} target="_blank" rel="noreferrer">
              words by {article.attributes.author}
            </a>
          </span>
        </div>
        <h1 className={styles.heading_title}>{article.attributes.title}</h1>
        <p className={styles.heading_desc}>{article.attributes.description}</p>
      </div>
      <div className={styles.article_image}>
        <Image
          src={
            article.attributes.image.data !== null
              ? article.attributes.image.data.attributes.formats.large.url
              : "https://res.cloudinary.com/pramudya-dev/image/upload/v1641964049/large_default_image_aa09a36476.jpg"
          }
          alt="image"
          priority
          layout="fill"
          quality={100}
          objectFit="cover"
        />
      </div>
      <div className={styles.article_content}>
        {article.attributes.content.split("\n").map((p) => (
          <p key={p} className={styles.content_paragraph}>
            {p}
          </p>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params: { id } }) {
  const { data: article } = await axios.get(`${API_URL}/api/articles/${id}?populate=image`);
  return {
    props: { article: article.data },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data: articles } = await axios.get(`${API_URL}/api/articles`);

  const paths = articles.data.map((article) => ({
    params: { id: article.id.toString() },
  }));

  return { paths, fallback: false };
}
