import React from "react";
import style from "./Layout.module.scss";
import SideNav from "../sidenav/SideNav";

const Layout = (props) => {
  return (
    <div className={style.container}>
      <div>
        <SideNav active={props.active} />
      </div>
      <div className={style.flex}>{props.children}</div>
    </div>
  );
};

export default Layout;
