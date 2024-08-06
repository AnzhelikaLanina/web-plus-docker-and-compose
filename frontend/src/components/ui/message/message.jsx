import React from "react";

import styles from "./message.module.css";

export const Message = ({ text = "", extraClass = "", isError = false }) => {
  const contentClassList = `${styles.content} ${
    isError && styles.error
  } ${extraClass}`;
  return (
    <div className={contentClassList}>
      <p className={`text text_type_message ${styles.text}`}>{text}</p>
    </div>
  );
};
