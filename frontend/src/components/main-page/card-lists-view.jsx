import { useContext } from "react";

import { GoodCard } from "../good-card";

import { UserContext } from "../../utils/context";

import styles from "./main-page.module.css";

export const CardListView = ({
  lastCards,
  topCards,
  isLogin,
  ownedTopCards,
  ownedLastCards,
}) => {
  return (
    <>
      <section className={styles.box}>
        <h2 className="text text_type_h2 text_color_primary mb-16">
          Недавно добавленные
        </h2>
        <div className={styles.cards_box}>
          {lastCards && (
            <GoodCardList
              cards={lastCards}
              isLogin={isLogin}
              ownedIds={ownedLastCards}
            />
          )}
        </div>
      </section>
      <section className={styles.box}>
        <h2 className="text text_type_h2 text_color_primary mb-16">
          Популярные
        </h2>
        <div className={styles.cards_box}>
          {topCards && (
            <GoodCardList
              cards={topCards}
              isLogin={isLogin}
              ownedIds={ownedTopCards}
            />
          )}
        </div>
      </section>
    </>
  );
};

const GoodCardList = ({ cards, isLogin, ownedIds }) => {
  const [user] = useContext(UserContext);

  return cards.map((cardInfo) => {
    const { name, price, raised, image, id } = cardInfo;
    const key = `${user.id}${id}`;
    const isOwned = ownedIds.includes(id);

    return (
      <GoodCard
        id={id}
        key={key}
        isLogin={isLogin}
        price={price}
        name={name}
        current={raised}
        img={image}
        isOwn={isOwned}
      />
    );
  });
};
