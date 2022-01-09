import datas from "./data.json";

export default function articles(req, res) {
  req.method === "GET"
    ? res.status(200).json(datas.articles)
    : res.status(405).json({ message: `${req.method} is not allowed` });
}
