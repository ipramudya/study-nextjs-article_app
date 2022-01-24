import cookie from "cookie";

export default async function (req, res) {
  const METHOD = "POST";

  //  Handle only POST request
  if (req.method === METHOD) {
    /* Destroy cookie */
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      })
    );

    /* Send response */
    res.status(200).json({ message: "Success" });
  }
  //  Handle other request
  else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
