import React from "react";
import style from "./SideNav.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthProvider, AuthContext } from "../context/auth-context";

const SideNav = (props) => {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);

  const isActive = (name) => {
    if (name === props.active) {
      return style.active;
    }
  };

  const logOut = () => {
    authContext.logout();
    router.push("/admin");
  };
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
        />
      </Head>

      <div className={style.l_navbar}>
        <nav className={style.nav}>
          <div className={style.nav__test}>
            <div className={style.nav__list}>
              <header className={style.header}>
                <div className={style.header__toggle}>
                  <img src="/logo.png" alt="img ishere" />
                </div>
                <span>Recycler</span>
              </header>
              <Link href="/admin/dashboard">
                <a
                  className={`${isActive("article")} ${style.nav__link} mt-4`}
                >
                  <i className={`bx bx-news ${style.nav__icon}`}></i>
                  <span className={style.nav__name}>Article</span>
                </a>
              </Link>

              <Link href="/admin/admin">
                <a
                  className={`${isActive("admin")} ${style.nav__link}`}
                >
                  <i className={`bx bx-user ${style.nav__icon}`}></i>
                  <span className={style.nav__name}>Admin</span>
                </a>
              </Link>

              <Link href="/admin/subscribers">
                <a
                  className={`${isActive("subscribers")} ${style.nav__link}`}
                >
                  <i className={`bx bx-lock ${style.nav__icon}`}></i>
                  <span className={style.nav__name}>Subscribers</span>
                </a>
              </Link>
            </div>
          </div>
          <a onClick={logOut} className={style.nav__link}>
            <i className={`bx bx-log-out ${style.nav__icon}`}></i>
            <span className={style.nav__name}>Log out </span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default SideNav;
