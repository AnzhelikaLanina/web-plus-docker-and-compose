import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./user-supported-card.module.css";

export const UserSupportedCard = ({
  name = "",
  img,
  amount,
  date,
  extraClass = "",
}) => {
  return (
    <article className={`${styles.content} ${extraClass}`}>
      <img className={styles.img} src={img} />
      <div className={`ml-8 ${styles.data_name_box}`}>
        <p
          className={`text text_type_small text_color_primary mb-2 ${styles.label}`}
        >
          Имя
        </p>
        <NavLink
          to="/user"
          className={`text text_type_main text_color_primary ${styles.link}`}
        >
          {`${name} ${"\u{2197}"}`}
        </NavLink>
      </div>
      <div className={`ml-10 ${styles.data_box}`}>
        <p
          className={`text text_type_small text_color_primary mb-2 ${styles.label}`}
        >
          Сумма
        </p>
        <p
          className={`text text_type_main text_color_primary`}
        >{`${amount} руб.`}</p>
      </div>
      <div className={`ml-10 ${styles.data_box}`}>
        <p
          className={`text text_type_small text_color_primary mb-2 ${styles.label}`}
        >
          Дата
        </p>
        <p className={`text text_type_main text_color_primary`}>{date}</p>
      </div>
    </article>
  );
};
