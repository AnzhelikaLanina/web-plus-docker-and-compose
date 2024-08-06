import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "../ui";

import styles from "./user-search-card.module.css";

export const UserSearchCard = ({ name = "", img, extraClass = "" }) => {
  const history = useHistory();

  const onClick = () => {
    history.push(`/users/${name}`);
  };

  return (
    <article className={`${styles.content} ${extraClass}`}>
      <img className={styles.img} src={img} />
      <div className={`ml-10 ${styles.data_box}`}>
        <h2 className="text text_type_h2 text_color_primary mb-2">{name}</h2>
      </div>
      <Button
        text="Перейти на страницу"
        type="button"
        kind="additional"
        extraClass={styles.btn}
        onClick={onClick}
      />
    </article>
  );
};
