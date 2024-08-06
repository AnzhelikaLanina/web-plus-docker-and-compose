import { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { Input, Button, Textarea } from "../ui";

import { UserContext } from "../../utils/context";
import { getOwnUser, loginUser, registerUser } from "../../utils/api";

import {
  MINIMUM_PASSWORD_LENGTH,
  MINIMUM_USERNAME_LENGTH,
  MAXIMUM_DESCRIPTION_LENGTH,
  EMAIL_REGULAR,
  URL_REGULAR,
  MAXIMUM_USERNAME_LENGTH,
} from "../../utils/constants";

import styles from "./sign-up.module.css";

export const SignUp = ({ extraClass = "" }) => {
  const [_user, setUser] = useContext(UserContext);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    about: "",
    avatar: "",
  });
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [stepOneDisabled, setStepOneDisabled] = useState(true);
  const [stepTwoDisabled, setStepTwoDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    errorMessage && setErrorMessage("");
    const usernameValid =
      userData.username.length >= MINIMUM_USERNAME_LENGTH &&
      userData.username.length <= MAXIMUM_USERNAME_LENGTH;
    const passwordValid = userData.password.length >= MINIMUM_PASSWORD_LENGTH;
    const emailValid = EMAIL_REGULAR.test(userData.email);
    const descriptionValid = userData.about.length < MAXIMUM_DESCRIPTION_LENGTH;
    const avatarValid = userData.avatar
      ? URL_REGULAR.test(userData.avatar)
      : true;

    setStepOneDisabled(!usernameValid || !passwordValid || !emailValid);
    setStepTwoDisabled(!descriptionValid || !avatarValid);
  }, [step, userData]);

  const onChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleBackToFirstStep = () => setStep(1);

  const handleSubmit = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      const { avatar, ...rest } = userData;
      errorMessage && setErrorMessage("");
      try {
        if (avatar) {
          await registerUser(userData);
        } else {
          await registerUser(rest);
        }
      } catch (err) {
        setErrorMessage(err.message);
        return;
      }

      try {
        const { access_token } = await loginUser(
          userData.username,
          userData.password
        );
        if (access_token) {
          const userDto = await getOwnUser();
          console.log(userDto);

          if (userDto.id) {
            setUser({ ...userDto });
            history.replace({ pathname: "/" });
          }
        }
      } catch (_err) {
        history.replace({ pathname: "/signin" });
      }
    }
  };

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <h2
        className={`text text_type_h2 text_color_primary mb-16 ${styles.title}`}
      >
        {`Регистрация ${step === 1 ? "1/2" : "2/2"}`}
      </h2>
      <form className={styles.form}>
        {step === 1 ? (
          <StepOne onChangeInput={onChangeInput} data={userData} />
        ) : (
          <StepTwo onChangeInput={onChangeInput} />
        )}
        {errorMessage && (
          <>
            <span className={styles.error}>{errorMessage}</span>
            <button
              type="button"
              className={styles.back_to_first_step}
              onClick={handleBackToFirstStep}
            >
              Вернуться на первый шаг
            </button>
          </>
        )}
        <Button
          type="button"
          kind="secondary"
          text={`${step === 1 ? "Далее" : "Зарегистрироваться"}`}
          disabled={step === 1 ? stepOneDisabled : stepTwoDisabled}
          extraClass={styles.btn}
          onClick={handleSubmit}
        />
      </form>
      <div className={styles.links_box}>
        <p
          className={`text text_type_main text_color_primary mb-9 ${styles.text}`}
        >
          Уже зарегистрированы?
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

const StepOne = ({ onChangeInput, data }) => {
  return (
    <>
      <Input
        name="username"
        type="username"
        id={1}
        placeholder="Придумайте юзернейм"
        label="Юзернейм"
        value={data.username}
        onChange={onChangeInput}
        extraClass="mb-16"
        required={true}
        maxLength={MAXIMUM_USERNAME_LENGTH}
      />
      <Input
        name="email"
        type="email"
        id={2}
        placeholder="Укажите тут"
        label="E-mail"
        value={data.email}
        onChange={onChangeInput}
        extraClass="mb-16"
        required={true}
      />
      <Input
        name="password"
        type="password"
        id={3}
        placeholder="Придумайте пароль"
        label="Пароль"
        value={data.password}
        onChange={onChangeInput}
        minLength={MINIMUM_PASSWORD_LENGTH}
        required={true}
      />
    </>
  );
};

const StepTwo = ({ onChangeInput }) => {
  return (
    <>
      <Textarea
        name="about"
        type="about"
        id={5}
        placeholder="Расскажите о себе"
        label="О себе"
        onChange={onChangeInput}
        extraClass="mb-16"
        maxLength={MAXIMUM_DESCRIPTION_LENGTH}
      />
      <Input
        name="avatar"
        type="url"
        id={7}
        placeholder="Укажите тут ссылку на аватар"
        label="Аватар"
        onChange={onChangeInput}
        extraClass="mb-16"
      />
    </>
  );
};
