import axios from "axios";
import cookie from "cookie";
import { API_URL } from "@/config/urls";

export default async function (req, res) {
  if (req.method === "GET") {
    //   check if cookie exist
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Allowed" });
    }
    //   parse cookie
    const { token } = cookie.parse(req.headers.cookie);
    try {
      //   fetch strapi API
      const { data, statusText } = await axios.get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   response handler
      if (statusText === "OK") {
        res.status(200).json({ user: data });
      } else {
        res.status(403).json({ message: "User forbidden" });
      }
    } catch (error) {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
