import { useState } from "react";
import Link from "next/link";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@/components/Button";
import CustomInput from "@/components/Input";
import Layout from "@/components/Layout";
import styles from "@/styles/Auth.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    console.log("submit", username, password);
    event.preventDefault();
  };

  return (
    <Layout>
      <div className={styles.auth}>
        <div className={styles.auth_box}>
          <h1 className={styles.auth_title}>Log in to your account</h1>
          <form onSubmit={handleSubmit}>
            <CustomInput
              //   label="Email"
              type="input"
              handleValue={(event) => setEmail(event.target.value)}
              value={email}
              ph="Email (e.g. rémark@example.com)"
              inputType="email"
              style={{ margin: "2rem 0 1.5rem 0" }}
            />
            <CustomInput
              //   label="Password"
              type="input"
              handleValue={(event) => setPassword(event.target.value)}
              value={password}
              ph="Password"
              inputType="password"
              style={{ margin: "1.5rem 0" }}
            />
            <Button fill buttonType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </form>
          <p className={styles.auth_subtitle}>
            Don&#39;t have an account ?{" "}
            <Link href="/account/register">
              <span>Register</span>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}