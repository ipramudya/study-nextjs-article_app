import axios from "axios";
import moment from "moment";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/urls";
import styles from "@/styles/Article.module.css";

export default function Article({ article }) {
  return (
    <Layout>
      <div className={styles.article_heading}>
        <div className={styles.heading_group}>
          <span>posted at &ndash; {moment(article.publishedAt).format("LL")}</span>
          <span className={styles.heading_link}>
            <a href={article.url} target="_blank" rel="noreferrer">
              words by {article.author}
            </a>
          </span>
        </div>
        <h1 className={styles.heading_title}>{article.title}</h1>
        <p className={styles.heading_desc}>{article.description}</p>
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
        {article.content.split("\n").map((p) => (
          <p key={p} className={styles.content_paragraph}>
            {p}
          </p>
        ))}
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
