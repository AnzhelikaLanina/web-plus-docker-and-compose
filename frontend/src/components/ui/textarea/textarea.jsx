import React from "react";

import styles from "./textarea.module.css";

export const Textarea = ({
  extraClass = "",
  extraInputClass = "",
  id,
  error,
  label,
  ...rest
}) => {
  return (
    <div className={`${styles.content} ${extraClass}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text text_type_main text_color_black mb-4 ${styles.label}`}
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`${styles.input} ${styles.textarea} text text_type_main text_color_primary ${extraInputClass}`}
        {...rest}
      />
      {error && (
        <span
          className={`text text_type_main text_color_red mt-4 ${styles.error}`}
        >
          {error}
        </span>
      )}
    </div>
  );
};
