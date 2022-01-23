import { useRouter } from "next/router";
import Link from "next/link";
import qs from "qs";
import axios from "axios";
import Layout from "@/components/Layout";
import GridItem from "@/components/GridItem";
import { API_URL } from "@/config/urls";
import articleStyles from "@/styles/Article.module.css";
import homeStyles from "@/styles/Home.module.css";

export default function SearchPage({ articles }) {
  const router = useRouter();
  return (
    <Layout>
      <h1 className={articleStyles.heading_title}>Search result : {router.query.query}</h1>
      {articles.length ? (
        <div className={homeStyles.home_grid}>
          {articles.map((article) => (
            <Link href={`/article/${article.id}`} key={article.id} passHref>
              <div className={homeStyles.grid_item}>
                <GridItem imageSource={article.image} title={article.title} description={article.description} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className={articleStyles.heading_desc}>Article you were looking for doesn&#39;t exist</p>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: { query } }) {
  const queryString = qs.stringify({
    _where: {
      _or: [{ title_contains: query }, { description_contains: query }, { author_contains: query }],
    },
  });

  const { data: articles } = await axios.get(`${API_URL}/articles?${queryString}`);

  return {
    props: { articles },
  };
}
