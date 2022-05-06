import React from "react";
import style from "./Layout.module.scss";
import SideNav from "../sidenav/SideNav";

const Layout = (props) => {
  return (
    <div className={style.container}>
      <SideNav active={props.active} />
      <div className={style.flexContainer}>{props.children}</div>
    </div>
  );
};

export default Layout;
