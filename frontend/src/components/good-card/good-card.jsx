import React from "react";
import { useLocation, Link, useHistory } from "react-router-dom";

import { Button, LoadingBox } from "../ui";

import { copyWish } from "../../utils/api";

import styles from "./good-card.module.css";

export const GoodCard = ({
  id,
  isOwn = false,
  price = 0,
  name = "",
  current,
  img,
  onClick,
  extraClass = "",
}) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleCopyClick = () => {
    copyWish(id).then(() => history.push("/wishlist"));
  };
  return (
    <article
      id={id}
      className={`${styles.content} ${extraClass}`}
      onClick={onClick}
    >
      <Link to={`/gift/${id}`} className={styles.img_box}>
        <img className={styles.img} src={img} alt="Фото товара." />
      </Link>
      <div className={styles.data_box}>
        <p
          className={`text text_type_h2 text_color_primary mb-4 ${styles.price}`}
        >
          {`${price} руб.`}
        </p>
        <p
          className={`text text_type_main text_color_primary mb-10 ${styles.name}`}
        >
          {name}
        </p>
        <LoadingBox current={current} total={price} />
        {pathname !== "/wishlist" && (
          <Button
            extraClass={styles.btn}
            text="Добавить в вишлист"
            type="button"
            kind="additional"
            onClick={handleCopyClick}
            disabled={isOwn}
          />
        )}
      </div>
    </article>
  );
};
