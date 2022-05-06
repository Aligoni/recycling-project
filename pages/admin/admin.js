import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/Layout";
import Table from "../../components/table/Table";
import Modal2 from "../../components/modal2/Modal2";
import Modal from "../../components/modal/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';
import { server } from "../../constants/server";

import style from "../../components/modal2/Modal2.module.scss";

const admin = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    
    if (!authContext.isUserAuthenticated()) {
      router.push("/");
      return;
    }

    const getData = async () => {
      try {
        const admins = await axios.get(`${server}/admins`);

        console.log(admins.data);

        if (admins.status == 200) {
          setAdmins(admins.data.data);
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
    <Layout active="admin">
      <div className="">
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
          
          {
            loading ? <CircularProgress /> : (
              <>
                {admins && <Table admins={admins} />}
              </>
            )
          }

        </div>
      </div>
      <Modal2 close={showModal2} showModal={modal2} refresh={refresh} setRefresh={setRefresh} />
    </Layout>
  );
};

export default admin;
