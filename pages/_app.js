import Head from 'next/head';

import { AuthProvider } from "../components/context/auth-context";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

import '../styles/globals.scss';
import 'tailwindcss/tailwind.css';
import "../components/table/table.scss";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Recycle-tronics!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
