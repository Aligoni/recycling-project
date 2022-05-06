import { useState } from "react";
import styles from "./Modal2.module.scss";
import Head from "next/head";
import axios from 'axios';
import { server } from "../../constants/server";
import CircularProgress from "@mui/material/CircularProgress";

const Modal2 = (props) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirst = e => setFirst(e.target.value);
  const handleLast = e => setLast(e.target.value);
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const createAdmin = async () => {
    setError(false);
    setSuccess(false);
    setText("");
    setLoading(true);

    if (!first || !last || !email || !password) {
      setError(true);
      setText("Please fill all fields");
      setLoading(false);
      return;
    }

    const body = {
      firstname: first,
      lastname: last,
      email,
      password,
    }

    try {
      const postAdmin = await axios.post(`${server}/admins/`, body);

      console.log(postAdmin.data);

      if (postAdmin.status == 200) {
        setSuccess(true);
        setText("Admin created successfully");
        props.close(false);
        props.setRefresh(!props.refresh)
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true)
      setText('Error creating admin')
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="modal__content">
        <div
          className={
            props.showModal
              ? `${styles.show__modal} ${styles.modal}`
              : styles.modal
          }
        >
          <div
            className={
              props.showModal
                ? `${styles.show__modal} ${styles.modal__container}`
                : styles.modal__container
            }
          >
            <h3 className={styles.modal__title}>Create Admin</h3>
            <Head>
              <link
                rel="stylesheet"
                href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
              />
            </Head>
            <div
              className={
                props.showModal
                  ? `${styles.show__modal} ${styles.modal__content}`
                  : styles.modal__content
              }
            >
              <div
                onClick={() => props.close(false)}
                className={styles.modal__close}
              >
                <i className="bx bx-x"></i>
              </div>

              {
                (error || success) && (
                  <div className={`${error ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'} px-4 py-2 text-center`} >
                    {text}
                  </div>
                )
              }
              <form className={styles.login__createadmin}>
                <div className={styles.login__box}>
                  <input
                    autoComplete="false"
                    type="text"
                    placeholder="First Name"
                    className={styles.login__input}
                    value={first}
                    onChange={handleFirst}
                  />
                </div>

                <div className={styles.login__box}>
                  <input
                    autoComplete="false"
                    type="text"
                    placeholder="Last Name"
                    className={styles.login__input}
                    value={last}
                    onChange={handleLast}
                  />
                </div>

                <div className={styles.login__box}>
                  <input
                    type="email"
                    placeholder="Email"
                    className={styles.login__input}
                    value={email}
                    onChange={handleEmail}
                  />
                </div>

                <div className={styles.login__box}>
                  <input
                    type="password"
                    placeholder="Password"
                    className={styles.login__input}
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
                <div className={styles.login__center}>
                  <button
                    type="button"
                    className={`${styles.modal__button} ${styles.modal__button_width}`}
                    onClick={createAdmin}
                  >
                    {
                      loading ? <CircularProgress /> : 'Create Admin'
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal2.propTypes = {};

export default Modal2;
