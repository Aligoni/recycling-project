import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.scss'
import { FaFacebookF, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa'
import { IconContext } from 'react-icons';
import { articles } from '../constants/articles';
import Navbar from '../components/Navbar'

import 'tailwindcss/tailwind.css'

export default function Home() {

  const router = useRouter();

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
            articles.map((article, i) => (
              <div className='overflow-hidden rounded-md shadow-md mt-4 cursor-pointer hover:shadow-xl' key={i}>
                <div className=''>
                  <img src={article.img} className='' />
                </div>
                <div className='px-4 py-2'>
                  <div className='flex justify-between items-center'>
                    <p className='text-sm text-gray-500'>{article.author}</p>
                    <p className='text-sm text-gray-500 ml-16'>{article.date}</p>
                  </div>
                  <p className='text-3xl my-2'>{article.title}</p>
                  <p>{article.preview}</p>
                  <p className='text-sm text-gray-500 mt-2'>{article.read}</p>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="flex justify-evenly pt-8" style={{ backgroundColor: "rgb(19, 19, 19)" }}>
          <img className="m-10 w-28 h-32" src="/logo.png" alt="" />
          <div className="m-10 px-10 text-center" style={{ width: '30%' }}>
            <p className="text-2xl text-gray-200">About This Website</p>
            <p className="text-lg text-gray-400">
              Ut non ex leo. Vestibulum facilisis leo eu mauris tincidunt dapibus. Sed
              Ut non ex leo. Vestibulum facilisis leo eu mauris tincidunt dapibus. Sed
            </p>
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
