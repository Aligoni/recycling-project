import React, { useState, useRef } from "react";
import styles from "./Modal.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import { server } from '../../constants/server'

const Modal2 = (props) => {
  const router = useRouter();
  const editorRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");

  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState();

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleTitle = e => setTitle(e.target.value);
  const handleSummary = e => setSummary(e.target.value);
  const handleImage = e => setImage(e.target.files[0]);

  const postArticle = async () => {
    setError(false);
    setSuccess(false);
    setText("");
    setLoading(true);

    const content = editorRef.current.getContent();
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/admin');
    }

    if (!title || !summary || !image || !content) {
      setError(true);
      setText("Leave no empty field");
      setLoading(false);
      return;
    }

    const fd = new FormData();
    fd.append('title', title);
    fd.append('summary', summary);
    fd.append('image', image);
    fd.append('adminId', token);
    fd.append('content', content)


    try {
      const article = await axios.post(`${server}/articles`, fd);
      console.log(article);
      if (article.status == 200) {
        setSuccess(true);
        setText('Posted Successfully')
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setText('Error posting article')
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
              {
                (error || success) && (
                  <div className={`${error ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'} px-4 py-2 text-center`} >
                    {text}
                  </div>
                )
              }
              <div>
                <div className={`${styles.login__box} mb-4`}>
                  <input
                    autoComplete="false"
                    type="text"
                    placeholder="Title"
                    className={styles.login__input}
                    value={title}
                    onChange={handleTitle}
                  />
                </div>
                
                <div className={`${styles.login__box} mb-4`}>
                  <input
                    type="file"
                    className={styles.login__input}
                    onChange={handleImage}
                  />
                </div>

                <Editor
                  onInit={(evt, editor) => editorRef.current = editor}
                  apiKey="2h6tc69zo0ipq88ybfoezx1b73fsvn6sakvbig8v11ip6bmr"
                  init={{
                    height: 500,
                    menubar: false,
                    // plugins: [
                    //   'advlist autolink lists link image charmap print preview anchor',
                    //   'searchreplace visualblocks code fullscreen',
                    //   'insertdatetime media table paste code help wordcount'
                    // ],
                    // toolbar: 'undo redo | formatselect | ' +
                    // 'bold italic backcolor | alignleft aligncenter ' +
                    // 'alignright alignjustify | bullist numlist outdent indent | ' +
                    // 'removeformat | help',
                    // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
                
                <div
                  className={styles.login__box}
                  style={{ marginBottom: "1rem" }}
                >
                  <input
                    autoComplete="false"
                    type="text"
                    placeholder="Summary"
                    className={styles.login__input}
                    value={summary}
                    onChange={handleSummary}
                  />
                </div>
                <div className="flex justify-end items-center">
                  <button 
                    onClick={postArticle}
                    className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-500"
                  >
                    Post Article
                  </button>
                </div>
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
