import React from "react";
import styles from "./Profile.module.scss";
const Profile = () => {
  return (
    <div className={styles.login}>
      <div className={styles.login__title}>
        <h3>Create Admin</h3>
      </div>
      <form className={styles.login__createadmin}>
        <div className={styles.login__box}>
          <input
            type="email"
            placeholder="Email"
            className={styles.login__input}
          />
        </div>
        <div className={styles.login__box}>
          <input
            autoComplete="false"
            type="text"
            placeholder="Name"
            className={styles.login__input}
          />
        </div>
        <div className={styles.login__box}>
          <input
            type="password"
            placeholder="Password"
            className={styles.login__input}
          />
        </div>
        <div className={styles.login__center}>
          <input
            type="submit"
            className={styles.login__button}
            value="Create Admin"
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
