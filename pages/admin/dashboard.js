import React, { useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/Layout";
import Modal2 from "../../components/modal2/Modal2";
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
      <div className={style.make}>
        <div className={styled.grid}>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </Layout>
  );
}
