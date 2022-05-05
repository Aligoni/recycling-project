import React from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../components/context/auth-context";
import Layout from "../../components/layout/Layout";
import Profile from "../../components/Profile/Profile";
import styles from "../../styles/Profile.module.scss";
const ProfileComp = () => {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);
  React.useEffect(() => {
    // checks if the user is authenticated
    authContext.isUserAuthenticated()
      ? router.push("/profile")
      : router.push("/");
  }, []);

  return (
      <div className={styles.container}>
        <Profile />
      </div>
  );
};

export default ProfileComp;
