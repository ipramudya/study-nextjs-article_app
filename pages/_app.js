import "@/styles/globals.css";
import "@/styles/Toastify.css";
import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
