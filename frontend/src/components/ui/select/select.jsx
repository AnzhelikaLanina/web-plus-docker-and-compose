import React from "react";

import styles from "./select.module.css";

export const Select = ({
  extraClass = "",
  extraSelectClass = "",
  id,
  error,
  label,
  options,
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
      <select
        id={id}
        className={`${styles.select} text text_type_main text_color_primary ${extraSelectClass}`}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
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
