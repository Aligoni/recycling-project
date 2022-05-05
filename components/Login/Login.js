import React, { useState } from "react";
import styles from "./Login.module.scss";
import { login } from "./api.auth";
import { useRouter } from "next/router";
import { AuthContext, AuthProvider } from "../context/auth-context";
import Layout from "../layout/Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSucess] = useState("");
  const authContext = React.useContext(AuthContext);
  const router = useRouter();

  const onEmailChange = (e) => {
    const mail = e.target.value;
    setEmail(mail);
  };

  const onPasswordChange = (e) => {
    const mail = e.target.value;
    setPassword(mail);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    // console.log(result);
    if (result) {
      setEmail("");
      setPassword("");
      authContext.setAuthState(result);
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__content}>
        <div className={styles.login__img}>
          <img src="/logo.png" alt="img ishere" />
        </div>
        <div className={styles.login__forms}>
          <form className={styles.login__register} onSubmit={onSubmit}>
            <h1 className={styles.login__title}>Sign In</h1>
            <div className={styles.login__box}>
              <input
                type="email"
                placeholder="Email"
                className={styles.login__input}
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className={styles.login__box}>
              <input
                type="password"
                placeholder="Password"
                className={styles.login__input}
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            <div className={styles.login__center}>
              <input
                type="submit"
                className={styles.login__button}
                value="Login"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
