import { API_URL } from "@/config/urls";
import axios from "axios";

export default async function (req, res) {
  if (req.method === "POST") {
    //  get body from next.js request
    const { identifier, password } = req.body;

    try {
      //  fetch strapi API
      const { data, status } = await axios.post(`${API_URL}/api/auth/local`, {
        identifier,
        password,
      });
      //  strapi response handler
      if (status === 200) {
        //  set cookie
        res.status(200).json({ user: data.user });
      } else {
        res.status(data.error.status).json({ message: data.error.message });
      }
    } catch (error) {
      const { data } = error.response;
      res.status(data.error.status).json({ message: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
