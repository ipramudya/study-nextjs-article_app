import axios from "axios";
import cookie from "cookie";
import { API_URL } from "@/config/urls";

export default async function (req, res) {
  if (req.method === "POST") {
    //  get body from next.js request
    const { username, email, password } = req.body;

    try {
      //  fetch strapi API
      const { data, status } = await axios.post(`${API_URL}/api/auth/local/register`, {
        username,
        email,
        password,
      });
      //  strapi response handler
      if (status === 200) {
        //  set cookie
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24, // a day
            sameSite: "strict",
            path: "/", // enable cookie for the entire app
          })
        );
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
