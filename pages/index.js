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
import Footer from '../components/Footer';

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
				
				setArtLoading(false);
      } catch (error) {
        console.log(error);
        setArtLoading(false);
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
          <Navbar />
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
        {
          artLoading ? <div className='my-8 w-full h-80 flex justify-center items-center'><CircularProgress className='text-black' /></div> : (
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
          )
        }
      </section>
      <Footer />
    </div>
  )
}
