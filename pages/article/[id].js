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
  console.log(article.content.split("\n"));
  return (
    <Layout>
      <div className={styles.article_heading}>
        <div className={styles.heading_group}>
          <span>posted at &ndash; {moment(article.publishedAt).format("LL")}</span>
          <span className={styles.heading_link}>
            <a href={article.url} target="_blank" rel="noreferrer">
              words by {article.source.name}
            </a>
          </span>
        </div>
        <h1 className={styles.heading_title}>{article.title}</h1>
        <p className={styles.heading_desc}>{article.description}</p>
      </div>
      <div className={styles.article_image}>
        <Image
          loader={imageLoader}
          src={article.urlToImage ? article.urlToImage : "/assets/300x300.svg"}
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
  const { data: article } = await axios.get(`${API_URL}/api/articles/${id}`);
  return {
    props: { article: article[0] },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data: articles } = await axios.get(`${API_URL}/api/articles`);

  const paths = articles.map((article) => ({
    params: { id: article.id },
  }));

  return { paths, fallback: true };
}
