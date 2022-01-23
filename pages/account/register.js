import { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import CustomInput from "@/components/Input";
import Layout from "@/components/Layout";
import styles from "@/styles/Auth.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { register, error, resetError } = useAuth();

  useEffect(() => {
    error && toast.error(error === "2 errors occurred" ? "All fields are required" : error, { theme: "dark" });

    // fixing  infinite error popup
    resetError();
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPass) {
      toast.error("Password doesn't match", { theme: "dark" });
      return;
    }

    register({ username, email, password });
  };

  return (
    <Layout>
      <ToastContainer position="top-left" hideProgressBar={true} autoClose={3000} transition={Slide} />
      <div className={styles.auth}>
        <div className={styles.auth_box}>
          <h1 className={styles.auth_title}>Create an account</h1>
          <form onSubmit={handleSubmit}>
            <CustomInput
              //    username input
              type="input"
              handleValue={(event) => setUsername(event.target.value)}
              value={username}
              ph="Username"
              style={{ margin: "2rem 0 1.5rem 0" }}
            />
            <CustomInput
              //    email input
              type="input"
              handleValue={(event) => setEmail(event.target.value)}
              value={email}
              ph="Email (e.g. rémark@example.com)"
              inputType="email"
              style={{ margin: "1.5rem 0" }}
            />
            <div className={styles.auth_divider_2}>
              <CustomInput
                //    password input
                type="input"
                handleValue={(event) => setPassword(event.target.value)}
                value={password}
                ph="Password"
                inputType="password"
              />
              <CustomInput
                //    set password input
                type="input"
                handleValue={(event) => setConfirmPass(event.target.value)}
                value={confirmPass}
                ph="Confirm"
                inputType="password"
              />
            </div>
            <Button fill buttonType="submit" style={{ width: "100%" }}>
              Register
            </Button>
          </form>
          <p className={styles.auth_subtitle}>
            Already have an account ?{" "}
            <Link href="/account/login">
              <span>Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
