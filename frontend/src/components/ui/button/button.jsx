import React from "react";

import styles from "./button.module.css";

export const Button = ({
  text = "",
  extraClass = "",
  kind = "primary",
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${styles[kind]} ${extraClass}`}
      {...rest}
    >
      <p className={`text text_type_button ${styles.text}`}>{text}</p>
    </button>
  );
};
