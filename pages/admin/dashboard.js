import React, { useState } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import style from "../../components/modal2/Modal2.module.scss";
import Card from "../../components/card/Card";
import styled from "../../styles/CardGrid.module.scss";

export default function Dashboard() {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);

  const [modal, setModal] = useState(false);

  const showModal = (value) => {
    console.log(value);
    setModal(value);
  };
  React.useEffect(() => {
    // checks if the user is authenticated
    authContext.isUserAuthenticated()
      ? router.push("/admin/dashboard")
      : router.push("/");
  }, []);
  return (
    <Layout active="article">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className={style.make}>
        <div style={{}}>
          <button className={style.make2} onClick={() => showModal(true)}>
            Create Article
          </button>
        </div>
        <div className={styled.grid}>
          <Card />
          <Card />  
          <Card />
        </div>
        <Modal close={showModal} showModal={modal} />
      </div>
    </Layout>
  );
}
