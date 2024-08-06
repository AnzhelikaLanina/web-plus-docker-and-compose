import { useState } from "react";

import eyeIcon from "../../../images/icons/preview.svg";
import eyeOffIcon from "../../../images/icons/no-preview.svg";

import styles from "./input.module.css";

export const Input = ({
  extraClass = "",
  extraInputClass = "",
  type,
  id,
  error,
  label,
  ...rest
}) => {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const customType =
    type === "password" ? (passwordOpen ? "text" : "password") : type;
  const passwordIcon = customType === "password" ? eyeOffIcon : eyeIcon;

  const handleTogglePassword = () => {
    setPasswordOpen(!passwordOpen);
  };

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
      <input
        id={id}
        type={customType}
        className={`${styles.input} text text_type_main text_color_primary ${extraInputClass}`}
        {...rest}
      />
      {type === "password" && (
        <button
          type="button"
          className={styles.eye_btn}
          onClick={handleTogglePassword}
        >
          <img
            className={styles.eye_img}
            src={passwordIcon}
            alt="Посмотреть пароль."
          />
        </button>
      )}
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
