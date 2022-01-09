import Link from "next/link";
import axios from "axios";
import Layout from "@/components/Layout";
import Banner from "@/components/Banner";
import GridItem from "@/components/Item";
import styles from "@/styles/Home.module.css";
import { API_URL } from "@/config/urls";

export default function Home({ articles }) {
  return (
    <Layout>
      <Banner />
      <div className={styles.home}>
        <div className={styles.home_grid}>
          {articles.map((article) => (
            <Link href={`/article/${article.id}`} key={article.id} passHref>
              <div className={styles.grid_item}>
                <GridItem imageSource={article.urlToImage} title={article.title} description={article.description} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: articles } = await axios.get(`${API_URL}/api/articles`);

  return {
    props: { articles },
    revalidate: 1,
  };
}
