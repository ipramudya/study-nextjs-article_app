import Link from "next/link";
import axios from "axios";
import QueryString from "qs";
import Layout from "@/components/Layout";
import Banner from "@/components/Banner";
import Search from "@/components/Search";
import GridItem from "@/components/GridItem";
import styles from "@/styles/Home.module.css";
import { API_URL } from "@/config/urls";

export default function Home({ articles }) {
  return (
    <Layout>
      <Banner />
      <Search />
      <div className={styles.home}>
        <div className={styles.home_grid}>
          {articles.map((article) => (
            <Link href={`/article/${article.id}`} key={article.id} passHref>
              <div className={styles.grid_item}>
                <GridItem imageSource={article.image} title={article.title} description={article.description} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: articles } = await axios.get(`${API_URL}/articles`);

  return {
    props: {
      articles,
    },
    revalidate: 1,
  };
}
