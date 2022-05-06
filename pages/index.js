import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.scss'
import { FaFacebookF, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa'
import { IconContext } from 'react-icons';
import { articles } from '../constants/articles';
import Navbar from '../components/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { server } from '../constants/server';

import 'tailwindcss/tailwind.css'

export default function Home() {

  const router = useRouter();

  const [artLoading, setArtLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const articles = await axios.get(`${server}/articles`);
				console.log(articles.data);

				if (articles.status == 200) {
					setArticles(articles.data.data);
				}
				
				setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleFirst = e => setFirst(e.target.value);
  const handleLast = e => setLast(e.target.value);
  const handleEmail = e => setEmail(e.target.value);

  const subscribe = async () => {
    setError(false);
    setSuccess(false);
    setText("");
    setLoading(true);

    if (!first || !last || !email) {
      setError(true);
      setText("Please fill all fields");
      setLoading(false);
      return;
    }

    const body = {
      firstname: first,
      lastname: last,
      email,
    }

    try {
      const sub = await axios.post(`${server}/subscribers`, body);
      console.log(sub.data);

      if (sub.status == 200) {
        setSuccess(true);
        setText("Subscription Succesful");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setText("Email already subscribed");
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img src="/assets/backdrop.jpg" alt="" width="100%" height="100%"/>
        
        <div className={styles.overlay}>
          <Navbar router={router} />
          <div className="flex-1 flex flex-col justify-center items-center">
            <h1 className={styles.header}>Recycle-tronics!</h1>
            <h5 className={styles.headerMini}>
              Help bring change to the world 
            </h5>
          </div>
        </div>
      </main>

      <section className='my-8'>
        <h1 className='text-center text-3xl underline'>Top Articles</h1>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4 w-4/5 max-w-7xl mx-auto'>
          {
            articles.filter((_, i) => i < 4).map((article, i) => (
              <div onClick={() => router.push(`/articles/${article.id}`)} className='overflow-hidden rounded-md shadow-md mt-4 cursor-pointer hover:shadow-xl' key={i}>
                <div className='w-full h-[70%]'>
                  <img src={article.image} className='w-full h-full object-contain' />
                </div>
                <div className='px-4 py-2'>
                  <div className='flex justify-between items-center'>
                    <p className='text-sm text-gray-500'>{article.admin.firstname} {article.admin.lastname}</p>
                    <p className='text-sm text-gray-500 ml-16'>{article.date}</p>
                  </div>
                  <p className='text-3xl my-2'>{article.title}</p>
                  <p>{article.preview}</p>
                  <p className='text-sm text-gray-500 mt-2'>likes: {article.likes}</p>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="flex justify-evenly pt-8" style={{ backgroundColor: "rgb(19, 19, 19)" }}>
          <img className="m-10 w-28 h-32" src="/logo.png" alt="" />
          <div className={styles['input-cont']} style={{ width: '30%' }}>
              {
                (error || success) && (
                  <div className={`${error ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'} px-4 py-2 text-center block`} >
                    {text}
                  </div>
                )
              }
            <p className='text-white'>Subscribe Now!</p>
            <input type='text' placeholder='First Name' value={first} onChange={handleFirst} />
            <input type='text' placeholder='Last Name' value={last} onChange={handleLast} />
            <input type='text' placeholder='Email' value={email} onChange={handleEmail} />
            <div>
              <button onClick={subscribe}>
                {
                  loading ? <CircularProgress className='text-white' /> : 'Subscribe'
                }
              </button>
            </div>
          </div>
          <div className="m-10" style={{ width: '30%' }}>
            <p className="text-2xl text-gray-200 text-center">Where you can find us</p>
            <div className="flex items-center justify-center my-8">
              <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                <FaFacebookF />
              </IconContext.Provider>
              <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                <FaGoogle />
              </IconContext.Provider>
              <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                <FaTwitter />
              </IconContext.Provider>
              <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                <FaInstagram />
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="bg-gray-600 text-gray-200 p-2 text-center text-lg">© 2022 Recycle-tronics. All rights reserved.</div>
      </footer>
    </div>
  )
}
