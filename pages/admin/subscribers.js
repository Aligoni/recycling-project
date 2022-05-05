import React from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/Layout";
import Table from "../../components/table/Table";

const subscribers = () => {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);
  React.useEffect(() => {
    // checks if the user is authenticated
    authContext.isUserAuthenticated()
      ? router.push("/admin/subscribers")
      : router.push("/");
  }, []);

  return (
    <Layout active="subscribers">
      <div>
        <h3>Subscribers</h3>
        <Table />
      </div>
    </Layout>
  );
};

export default subscribers;
