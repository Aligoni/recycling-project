import React, { useState, useRef } from "react";
import styles from "./Modal.module.scss";
import Head from "next/head";
import { Editor } from "@tinymce/tinymce-react";

const Modal2 = (props) => {
  const editorRef = useRef(null);
  const [data, setData] = useState("");
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
            <h3 className={styles.modal__title}>Create Article</h3>
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
              <div>
                <div className={styles.login__box}>
                  <input
                    autoComplete="false"
                    type="text"
                    placeholder="Title"
                    className={styles.login__input}
                  />
                </div>
                <div
                  className={styles.login__box}
                  style={{ marginBottom: "1rem" }}
                >
                  <input
                    autoComplete="false"
                    type="text"
                    placeholder="Topic"
                    className={styles.login__input}
                  />
                </div>
                <Editor
                  apiKey="2h6tc69zo0ipq88ybfoezx1b73fsvn6sakvbig8v11ip6bmr"
                  value={data}
                  onEditorChange={(e) => setData(e)}
                />
              </div>

              {/* <Editor
                id=""
                apiKey="2h6tc69zo0ipq88ybfoezx1b73fsvn6sakvbig8v11ip6bmr"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              /> */}

              {/* <form className={styles.login__createadmin}>
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
              </form> */}
              {/* <form className={styles.login__createadmin}>
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
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal2.propTypes = {};

export default Modal2;
