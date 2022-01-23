import { useRouter } from "next/router";
import axios from "axios";
import QueryString from "qs";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { parseCookie } from "@/helpers/parseCookies";
import { API_URL } from "@/config/urls";
import articleStyles from "@/styles/Article.module.css";
import Layout from "@/components/Layout";
import ListItem from "@/components/ListItem";

export default function DashboardPage({ articles }) {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  const handleRemove = async (id) => {
    const { status } = await axios.delete(`${API_URL}/api/articles/${id}`);

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
      <h1 className={articleStyles.heading_title} style={{ marginBottom: "2rem" }}>
        Your Article
      </h1>
      {articles.data.map((article) => (
        <ListItem
          key={article.id}
          article={article.attributes}
          handleEdit={() => handleEdit(article.id)}
          handleRemove={() => handleRemove(article.id)}
        />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);
  const query = QueryString.stringify(
    {
      fields: ["title", "description"],
      populate: {
        image: {
          fields: ["formats"],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const { data: articles } = await axios.get(`${API_URL}/api/article/me?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      articles,
    },
  };
}
