import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./button-return.module.css";

export const ButtonReturn = ({ extraClass = "", ...rest }) => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <button
      className={`${styles.button} ${extraClass}`}
      onClick={handleClick}
      type="button"
      {...rest}
    >
      <p className={`text text_type_h2 ${styles.text}`}>{"\u{2190}"}</p>
      <p className={`text text_type_button ml-4`}>Назад</p>
    </button>
  );
};
