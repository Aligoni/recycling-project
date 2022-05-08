import React, { useState, useEffect } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import Card from "../../components/card/Card";
import styled from "../../styles/CardGrid.module.scss";
import { server } from '../../constants/server';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import style from "../../components/modal2/Modal2.module.scss";

export default function Dashboard() {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [modal, setModal] = useState(false);
  const [articles, setArticles] = useState([]);

  const showModal = (value) => {
    console.log(value);
    setModal(value);
  };

  useEffect(() => {
    setLoading(true);

    if (!authContext.isUserAuthenticated()) {
      router.push("/admin")
      return;
    }

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
        setLoading(false);
      }
    }
    getData();
  }, [refresh]);

  return (
    <Layout active="article">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className={style.make}>
        <div className="text-center">
          <button className={style.make2} onClick={() => showModal(true)}>
            Create Article
          </button>
        </div>
        <div className={'grid grid-cols-2 lg:grid-cols-4 gap-4'}>
          {
            loading ? <CircularProgress /> : (
              articles.map(article => (
                <Card key={article.id} article={article} />
              ))
            )
          }
        </div>
        <Modal close={showModal} showModal={modal} refresh={refresh} setRefresh={setRefresh} />
      </div>
    </Layout>
  );
}
