import datas from "./data.json";

export default function articles(req, res) {
  const specificArticle = datas.articles.filter((data) => data.id === req.query.id);

  req.method === "GET"
    ? res.status(200).json(specificArticle)
    : res.status(405).json({ message: `${req.method} is not allowed` });
}
