import 'tailwindcss/tailwind.css'

import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { FaFacebookF, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa'
import { IconContext } from 'react-icons'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recycle-tronics!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src="/assets/home-background.jpg" alt="" width="100%" height="100%"/>
        
        <div className={styles.overlay}>
          <div className={styles.top +" flex w-full justify-between"}>
            <img className="ml-4 mb-2 w-20 h-20 cursor-pointer" src="/logo.png" alt="" />
            <div className={`${styles.navtext} flex items-center justify-between`}>
              <p className={`${styles.item}`}>Articles</p>
              <p className={`${styles.item}`}>About</p>
              <p className={`${styles.item}`}>Contact</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <h1 className={styles.header}>Recycle-tronics!</h1>
            <h5 className={styles.headerMini}>The website will allow people to track and identify the effects that computing machinery has on the environment. This will be showcased using statistics from all over a particular area, or from a broader spectrum, various places in the country or all over the world.</h5>
          </div>
        </div>
      </main>

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
