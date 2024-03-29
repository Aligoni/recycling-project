import React, { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import { login } from "./api.auth";
import { useRouter } from "next/router";
import { AuthContext, AuthProvider } from "../context/auth-context";
import Layout from "../layout/Layout";
import axios from 'axios';
import { server } from '../../constants/server';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");

  const authContext = React.useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authContext.isUserAuthenticated()) {
      setSuccess(true)
      setText('Already Logged In')
      router.replace('/admin/dashboard')
    }
  }, [])

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    setText("");
    setLoading(true);

    if (!email || !password) {
      setError(true);
      setText("Please fill all fields");
      setLoading(false);
      return;
    }

    const body = {
      email,
      password
    }

    try {
      const login = await axios.post(`${server}/admins/login`, body);
      
      if (login.status == 200) {
        console.log(login.data);
        authContext.setAuthState(login.data.data.id);
        setSuccess(true)
        setText('Login Successfull')
        router.push("/admin/dashboard");
      } else {
        setError(true)
        setText('Invalid username/password')
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true)
      setText('Invalid username/password')
      setLoading(false);
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
            {
              (error || success) && (
                <div className={`${error ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'} px-4 py-2 text-center block`} >
                  {text}
                </div>
              )
            }
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
                value={loading ? "Loading..." : "Login"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
