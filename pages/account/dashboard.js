import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { parseCookie } from "@/helpers/parseCookies";
import { API_URL } from "@/config/urls";
import articleStyles from "@/styles/Article.module.css";
import Layout from "@/components/Layout";
import ListItem from "@/components/ListItem";

export default function DashboardPage({ articles, token }) {
  const router = useRouter();

  /**  Edit handler  **/
  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  /**  Remove handler  **/
  const handleRemove = async (id) => {
    /* Fetch strapi API */
    const res = await fetch(`${API_URL}/articles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    /* Handle strapi error  */
    if (res.status !== 200) {
      toast.error("Error, please try again", { theme: "dark" });
      return;
    }

    /* Result */
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
      {articles.map((article) => (
        <ListItem
          key={article.id}
          article={article}
          handleEdit={handleEdit}
          handleRemove={() => handleRemove(article.id)}
        />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  const { data: articles } = await axios.get(`${API_URL}/articles/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      articles,
      token,
    },
  };
}
