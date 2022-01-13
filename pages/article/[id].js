import axios from "axios";
import moment from "moment";
import Layout from "@/components/Layout";
import styles from "@/styles/Article.module.css";
import { API_URL } from "@/config/urls";
import Image from "next/image";

function imageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality}`;
}

export default function Article({ article }) {
  return (
    <Layout>
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
          loader={imageLoader}
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