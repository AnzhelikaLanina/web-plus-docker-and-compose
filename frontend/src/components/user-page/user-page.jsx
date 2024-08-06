import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ButtonReturn } from "../ui";
import { GoodCard } from "../good-card";

import {
  getAnotherUser,
  getAnotherUserWishes,
  getOwnWishes,
} from "../../utils/api";

import { findOwnedIds } from "../../utils/functions";

import styles from "./user-page.module.css";

export const UserPage = ({ extraClass = "" }) => {
  const [anotherUser, setAnotherUser] = useState({});
  const [anotherUserWishes, setAnotherUserWishes] = useState([]);
  const [myWishes, setMyWishes] = useState([]);

  const alreadyOwnWishesId = findOwnedIds(myWishes, anotherUserWishes);

  const { username } = useParams();

  useEffect(() => {
    if (!username) return;
    Promise.all([
      getAnotherUserWishes(username),
      getAnotherUser(username),
      getOwnWishes(),
    ]).then((values) => {
      const [wishes, profileInfo, myWishes] = values;
      setAnotherUser(profileInfo);
      setAnotherUserWishes(wishes);
      setMyWishes(myWishes);
    });
  }, [username]);

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <ButtonReturn />
      <h1
        className={`text text_type_h1 text_color_primary mb-16 ${styles.title}`}
      >
        {`Пользователь: ${anotherUser?.username} `}
      </h1>

      <p
        className={`text text_type_main text_color_primary mb-16 ${styles.description}`}
      >
        {`Обо мне: ${anotherUser?.about || "ничего неизвестно"}`}
      </p>
      <div className={styles.cards}>
        <h2 className={`text text_type_h2 text_color_primary ${styles.title}`}>
          Вишлист пользователя:
        </h2>
        <div className={styles.cards_box}>
          {anotherUserWishes?.map(
            ({ price, name, raised, image, link, id }) => {
              return (
                <GoodCard
                  key={id}
                  id={id}
                  price={price}
                  name={name}
                  current={raised}
                  img={image}
                  link={link}
                  isOwn={alreadyOwnWishesId.includes(id)}
                />
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};
