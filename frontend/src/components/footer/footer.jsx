import React from "react";
import { useLocation } from "react-router-dom";

import logoIcon from "../../images/icons/logo-mini.svg";

import styles from "./footer.module.css";

export const Footer = ({ extraClass = "" }) => {
  const location = useLocation();

  const footerClassList = `${styles.footer} ${
    (location.pathname === "/signin" ||
      location.pathname === "/signup" ||
      location.pathname === "/recovery") &&
    styles.hidden
  } ${extraClass}`;

  return (
    <footer className={footerClassList}>
      <div className={styles.content}>
        <img src={logoIcon} alt="Логотип." />
        <p
          className={`text text_type_footer text_color_primary ${styles.text}`}
        >{`${"\u{00A9}"}${new Date().getFullYear()}, Купи Подари Дай`}</p>
      </div>
    </footer>
  );
};
