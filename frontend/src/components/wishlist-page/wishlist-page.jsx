import { useState, useEffect } from "react";

import { GoodCard } from "../good-card";

import { Modal, Button } from "../ui";

import cancelIcon from "../../images/icons/cancel.svg";
import trashIcon from "../../images/icons/trash-red.svg";

import { getOwnWishes, removeWish } from "../../utils/api";

import styles from "./wishlist-page.module.css";

export const WishlistPage = ({ extraClass = "" }) => {
  const [currentCardsId, setCurrentCardsId] = useState([]);
  const [data, setOwnWishes] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("auth_token")) {
      getOwnWishes().then((res) => {
        setOwnWishes(res);
      });
    }
  }, []);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const onCardClick = (e) => {
    const card =
      e.target.tagName === "ARTICLE" ? e.target : e.target.closest("article");
    if (currentCardsId.indexOf(+card.id) !== -1) {
      const arr = [...currentCardsId];
      arr.splice(currentCardsId.indexOf(+card.id), 1);
      setCurrentCardsId(arr);
    } else {
      setCurrentCardsId([...currentCardsId, +card.id]);
    }
  };

  const handleRemoveSelection = () => {
    isPopupOpen && setIsPopupOpen(false);
    setCurrentCardsId([]);
  };

  const handleRemoveCards = () => {
    Promise.all(currentCardsId.map((id) => removeWish(id).catch())).then(() => {
      getOwnWishes().then((res) => {
        setCurrentCardsId([]);
        setOwnWishes(res);
        handlePopupClose();
      });
    });
  };

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <h1 className={`text text_type_h1 text_color_primary ${styles.title}`}>
        Мой вишлист
      </h1>
      {currentCardsId.length ? (
        <div className={styles.menu}>
          <p className="text text_type_button">{`Выберите то, что хотите удалить | ${currentCardsId.length} выбрано`}</p>
          <div className={styles.btn_box}>
            <button
              className={styles.btn}
              type="button"
              onClick={handleRemoveSelection}
            >
              <img src={cancelIcon} alt="Кнопка снятия выделения." />
              <p className="text text_type_button ml-4">Снять выделение</p>
            </button>
            <button
              className={styles.btn}
              type="button"
              onClick={handlePopupOpen}
            >
              <img src={trashIcon} alt="Кнопка удаления карточки." />
              <p className="text text_type_button text_color_red-bg ml-4">
                Удалить выбранное
              </p>
            </button>
            {isPopupOpen && (
              <Modal onClose={handlePopupClose} extraClass={styles.modal}>
                <div className={styles.popup}>
                  <p className="text text_type_main mb-10">
                    Удалить выбранные подарки?
                  </p>
                  <div className={styles.popup_btn_box}>
                    <Button
                      type="button"
                      extraClass={styles.popup_btn}
                      kind="support"
                      text="Отмена"
                      onClick={handleRemoveSelection}
                    />
                    <Button
                      type="button"
                      extraClass={styles.popup_btn}
                      kind="secondary"
                      onClick={handleRemoveCards}
                      text="Удалить"
                    />
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={styles.cards_box}>
        {data.map(({ id, price, image, name, raised }) => {
          let withBorder = false;
          if (currentCardsId.indexOf(id) !== -1) {
            withBorder = true;
          }
          return (
            <GoodCard
              key={id}
              id={id}
              onClick={onCardClick}
              price={price}
              img={image}
              name={name}
              current={raised}
              extraClass={withBorder ? styles.border : ""}
            />
          );
        })}
      </div>
    </section>
  );
};
