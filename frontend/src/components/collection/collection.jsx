import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { GoodCard } from "../good-card";

import { getCollection } from "../../utils/api";

import { UserContext } from "../../utils/context";

import styles from "./collection.module.css";

export const Collection = ({ extraClass = "" }) => {
  const [user] = useContext(UserContext);
  const [data, setData] = useState({});
  // const [pagData, setPagData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getCollection(id)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <section className={styles.box}>
        <h2 className="text text_type_h2 text_color_primary mb-16">
          {data.name}
        </h2>
        <div className={styles.cards_box}>
          {data.items?.map((card) => {
            return (
              <GoodCard
                id={card.id}
                isOwn={user.id === data.owner.id}
                key={card.id}
                isLogin={!!user.id}
                price={card.price}
                name={card.name}
                img={card.image}
                current={card.raised}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};
