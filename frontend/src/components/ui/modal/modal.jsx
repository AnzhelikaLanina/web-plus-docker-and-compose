import React from "react";
import ReactDOM from "react-dom";

import closeIcon from "../../../images/icons/cancel.svg";

import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

export const Modal = ({
  children,
  onClose,
  isCloseBtn = false,
  extraClass = "",
}) => {
  return ReactDOM.createPortal(
    <>
      <div className={`${styles.content} ${extraClass}`}>
        {isCloseBtn && (
          <button className={styles.close_btn} type="button" onClick={onClose}>
            <img src={closeIcon} alt="Кнопка закрытия." />
          </button>
        )}
        {children}
      </div>
      <div className={styles.overlay} onClick={onClose} />
    </>,
    modalRoot
  );
};
