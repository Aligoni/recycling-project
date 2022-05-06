import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/Layout";
import Table from "../../components/table/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { server } from "../../constants/server";
import axios from 'axios';

const subscribers = () => {

  const router = useRouter();
  const authContext = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    if (!authContext.isUserAuthenticated()) {
      router.push('/admin');
      return;
    }

    const getData = async () => {
      try {
        const subscribers = await axios.get(`${server}/subscribers`);
        console.log(subscribers.data);

        if (subscribers.status == 200) {
          setSubscribers(subscribers.data.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <Layout active="subscribers">
      <div className="w-full max-w-6xl mx-auto my-4">
        <h3>Subscribers</h3>
        {
          loading ? <CircularProgress /> : (
            <Table subscribers={subscribers} />
          )
        }
      </div>
    </Layout>
  );
};

export default subscribers;
