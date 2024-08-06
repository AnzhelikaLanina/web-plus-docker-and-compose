import { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { Input, Button } from "../ui";

import { getOwnUser, loginUser } from "../../utils/api";

import { UserContext } from "../../utils/context";

import {
  MINIMUM_USERNAME_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
} from "../../utils/constants";

import styles from "./sign-in.module.css";

export const SignIn = ({ extraClass = "" }) => {
  const [_userCtx, setUserCtx] = useContext(UserContext);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const usernameValid = userData.username.length >= MINIMUM_USERNAME_LENGTH;
  const passwordValid = userData.password.length >= MINIMUM_PASSWORD_LENGTH;
  const submitDisabled = !usernameValid || !passwordValid;

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const authorizeUser = async (event) => {
    event.preventDefault();
    errorMessage && setErrorMessage("");
    try {
      const response = await loginUser(userData.username, userData.password);
      if (response && response.access_token) {
        const user = await getOwnUser();
        setUserCtx(user);
        history.replace({ pathname: "/gifts/line" });
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <h2
        className={`text text_type_h2 text_color_primary mb-16 ${styles.title}`}
      >
        Вход
      </h2>
      <form className={styles.form} onSubmit={authorizeUser}>
        <Input
          name={"username"}
          type="text"
          id={1}
          placeholder="Введите имя пользователя"
          label="Юзернейм"
          onChange={onChangeInput}
          extraClass="mb-16"
          minLength={MINIMUM_USERNAME_LENGTH}
          required={true}
        />
        <Input
          name={"password"}
          type="password"
          id={2}
          placeholder="Введите пароль"
          label="Пароль"
          onChange={onChangeInput}
          minLength={MINIMUM_PASSWORD_LENGTH}
          required={true}
        />
        {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        <Button
          type="submit"
          kind="secondary"
          text="Войти"
          extraClass={styles.btn}
          disabled={submitDisabled}
        />
      </form>
      <div className={styles.links_box}>
        <p
          className={`text text_type_main text_color_primary mb-9 ${styles.text}`}
        >
          Вы — новый пользователь?
        </p>
        <NavLink
          to="/signup"
          className={`text text_type_button text_color_primary ${styles.nav}`}
        >
          Зарегистрироваться
        </NavLink>
      </div>
    </div>
  );
};
