import useMedia from "use-media";

import "@/styles/globals.css";
import "@/styles/Toastify.css";
import { AuthProvider } from "@/context/AuthContext";
import NotWide from "@/components/NotWide";

function MyApp({ Component, pageProps }) {
  const isWide = useMedia({ minWidth: 1100 });

  return <AuthProvider>{isWide ? <Component {...pageProps} /> : <NotWide />}</AuthProvider>;
}

export default MyApp;
