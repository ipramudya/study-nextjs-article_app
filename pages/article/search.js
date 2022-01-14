import { useRouter } from "next/router";
import Link from "next/link";
import qs from "qs";
import axios from "axios";
import Layout from "@/components/Layout";
import GridItem from "@/components/Item";
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
                <GridItem
                  imageSource={article.attributes.image.data}
                  title={article.attributes.title}
                  description={article.attributes.description}
                />
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
  const queryString = qs.stringify(
    {
      filters: {
        $or: [
          {
            title: {
              $contains: query,
            },
          },
          {
            description: {
              $contains: query,
            },
          },
          {
            author: {
              $contains: query,
            },
          },
          {
            publishedAt: {
              $contains: query,
            },
          },
        ],
      },
    },
    { encodeValuesOnly: true }
  );

  const {
    data: { data: articles },
  } = await axios.get(`${API_URL}/api/articles?${queryString}&populate=image`);

  return {
    props: { articles },
  };
}
