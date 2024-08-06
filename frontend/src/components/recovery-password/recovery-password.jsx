import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./recovery-password.module.css";
import { Input } from "../ui/input/input";
import { NavLink } from "react-router-dom";
import { getUser, loginUser } from "../../utils/api";
import { Button } from "../ui/button/button";

export const RecoveryPassword = ({ extraClass = "" }) => {
  const [userData, setUserData] = React.useState({});
  const [step, setStep] = React.useState(1);

  const history = useHistory();

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2);
    }
    // loginUser(userData.username, userData.password).then((res) => {
    //   if (res && res.auth_token) {
    //     getUser().then((res) => {
    //       if (res && res.id) {
    //         history.replace({ pathname: "/" });
    //       }
    //     });
    //   }
    // });
  };

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <h2
        className={`text text_type_h2 text_color_primary mb-16 ${styles.title}`}
      >
        Восстановление пароля
      </h2>
      <form className={styles.form}>
        {step === 1 ? (
          <Input
            name="email"
            type="email"
            id={1}
            placeholder="Укажите тут"
            label="E-mail"
            onChange={onChangeInput}
          />
        ) : (
          <>
            <Input
              name="password"
              type="password"
              id={2}
              placeholder="Введите новый пароль"
              label="Новый пароль"
              onChange={onChangeInput}
              extraClass="mb-16"
            />
            <Input
              name="text"
              type="text"
              id={3}
              placeholder="Введите код из письма"
              label="Код из письма"
              onChange={onChangeInput}
            />
          </>
        )}
        <Button
          type="button"
          kind="secondary"
          text={`${step === 1 ? "Восстановить" : "Сохранить"}`}
          extraClass={styles.btn}
          onClick={handleSubmit}
        />
      </form>
      <div className={styles.links_box}>
        <p
          className={`text text_type_main text_color_primary mb-9 ${styles.text}`}
        >
          Вспомнили пароль?
        </p>
        <NavLink
          to="/signin"
          className={`text text_type_button text_color_primary ${styles.nav}`}
        >
          Войти
        </NavLink>
      </div>
    </div>
  );
};
