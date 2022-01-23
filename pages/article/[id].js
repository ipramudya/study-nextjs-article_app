import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/urls";
import styles from "@/styles/Article.module.css";

export default function Article({ article }) {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.article_heading}>
        <div className={styles.heading_group}>
          <span>posted at &ndash; {moment(article.publishedAt).format("LL")}</span>
          <span className={styles.heading_link}>
            <a href={article.url ? article.url : router.asPath} target="_blank" rel="noreferrer">
              words by {article.author ? article.author : "No Author"}
            </a>
          </span>
        </div>
        <h1 className={styles.heading_title}>{article.title ? article.title : "No Title"}</h1>
        <p className={styles.heading_desc}>{article.description ? article.description : "No Description written"}</p>
      </div>
      <div className={styles.article_image}>
        <Image
          src={
            article.image.data !== null
              ? article.image.formats.large.url
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
        {article.content ? (
          article.content.split("\n").map((paragraph) => (
            <p key={paragraph} className={styles.content_paragraph}>
              {paragraph}
            </p>
          ))
        ) : (
          <p className={styles.content_paragraph}>Content is empty</p>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params: { id } }) {
  const { data: article } = await axios.get(`${API_URL}/articles/${id}`);
  return {
    props: { article },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data: articles } = await axios.get(`${API_URL}/articles`);

  const paths = articles.map((article) => ({
    params: { id: article.id.toString() },
  }));

  return { paths, fallback: false };
}
