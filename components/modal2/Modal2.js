import React, { useState, useRef } from "react";
import styles from "./Modal2.module.scss";
import Head from "next/head";

const Modal2 = (props) => {
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

              <form className={styles.login__createadmin}>
                <div className={styles.login__box}>
                  <input
                    type="email"
                    placeholder="Email"
                    className={styles.login__input}
                  />
                </div>
                <div className={styles.login__box}>
                  <input
                    autoComplete="false"
                    type="text"
                    placeholder="Name"
                    className={styles.login__input}
                  />
                </div>
                <div className={styles.login__box}>
                  <input
                    type="password"
                    placeholder="Password"
                    className={styles.login__input}
                  />
                </div>
                <div className={styles.login__center}>
                  <button
                    type="button"
                    className={`${styles.modal__button} ${styles.modal__button_width}`}
                  >
                    Create Admin
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
