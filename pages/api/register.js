import cookie from "cookie";
import { API_URL } from "@/config/urls";

export default async function (req, res) {
  const METHOD = "POST";

  //  Handle only POST request
  if (req.method === "POST") {
    /* Get body from next.js request */
    const { username, email, password } = req.body;

    /* Fetch strapi API */
    const strapiResponse = await fetch(`${API_URL}/auth/local/register`, {
      method: METHOD,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    /* Extract json data */
    const strapiData = await strapiResponse.json();

    // Everything goes OK
    if (strapiResponse.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", strapiData.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24, // a day
          sameSite: "strict",
          path: "/", // enable cookie for the entire app
        })
      );

      /* Send response */
      res.status(200).json({ user: strapiData.user });
    }
    // Handle strapi error response
    else {
      res.status(strapiData.statusCode).json({
        message: strapiData.message[0].messages[0].message,
      });
    }
  }
  // Handle other request
  else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
