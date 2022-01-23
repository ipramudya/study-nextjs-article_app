import axios from "axios";
import cookie from "cookie";
import { API_URL } from "@/config/urls";

export default async function (req, res) {
  const METHOD = "GET";

  if (req.method === METHOD) {
    //   check if cookie exist
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Allowed" });
    }
    /* Parse cookie */
    const { token } = cookie.parse(req.headers.cookie);

    /* Fetch strapi API */
    const strapiResponse = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    /* Extract user data */
    const user = await strapiResponse.json();

    //  Everything goes OK
    if (strapiResponse.ok) {
      res.status(200).json({ user });
    }
    //  Handle error response
    else {
      res.status(strapiResponse.status).json({ message: "User forbidden" });
    }
  }
  // Handle other request
  else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
