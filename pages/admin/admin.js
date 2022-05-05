import React, { useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/Layout";
import Table from "../../components/table/Table";
import Modal2 from "../../components/modal2/Modal2";
import Modal from "../../components/modal/Modal";
import style from "../../components/modal2/Modal2.module.scss";

const admin = () => {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const showModal = (value) => {
    if (modal2) {
      setModal2(false);
    }
    setModal(value);
  };
  const showModal2 = (value) => {
    if (modal) {
      setModal(false);
    }
    setModal2(value);
  };

  React.useEffect(() => {
    // checks if the user is authenticated
    authContext.isUserAuthenticated()
      ? router.push("/admin/admin")
      : router.push("/");
  }, []);

  return (
    <Layout active="admin">
      <div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <button className={style.make2} onClick={() => showModal2(true)}>
              Create Admin
            </button>
          </div>

          <Table />
        </div>
      </div>
      <Modal2 close={showModal2} showModal={modal2} />
    </Layout>
  );
};

export default admin;
