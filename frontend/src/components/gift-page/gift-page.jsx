import { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";

import { Button, ButtonReturn, LoadingBox, Modal, Input } from "../ui";
import { UserSupportedCard } from "../user-supported-card";

import { priceArr } from "../../utils/constants";

import { addOffer, getCard, copyWish, getOwnWishes } from "../../utils/api";

import styles from "./gift-page.module.css";

export const GiftPage = ({ extraClass = "" }) => {
  const history = useHistory();
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddToWishDisabled, setIsAddToWishDisabled] = useState(false);
  const [currentSupportedBtn, setCurrentSupportedBtn] = useState(100);
  const [anotherSum, setAnotherSum] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [wishData, setWishData] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem("auth_token")) {
      Promise.all([getCard(id), getOwnWishes()]).then(([card, wishlist]) => {
        setWishData(card);
        const goodInMyWish = wishlist.find((item) => item.id === card.id);
        if (goodInMyWish) {
          setIsAddToWishDisabled(true);
        }
      });
    }
  }, [id]);

  const isRaised = wishData.raised === wishData.price;

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handleSupportClick = () => {
    errorMessage && setErrorMessage("");
    const amount = +anotherSum || currentSupportedBtn;
    addOffer({
      itemId: wishData.id,
      amount,
      hidden: false,
    })
      .then(() => {
        handlePopupClose();
        getCard(id).then((res) => {
          setWishData(res);
        });
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const handleGoToShop = () => {
    window.open(wishData.link, "_blank");
  };

  const handleCopyClick = () => {
    copyWish(wishData.id).then(() => history.push("/wishlist"));
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSupportedBtnsClick = (e) => {
    const id = +e.target.closest("button").getAttribute("id");
    setCurrentSupportedBtn(id);
    setAnotherSum("");
  };

  const handleChangeInput = (e) => {
    const sum = e.target.value;
    setAnotherSum(sum);
    setCurrentSupportedBtn(+sum);
  };

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <ButtonReturn />
      <h1 className="text text_type_h1 mb-16">{wishData.name}</h1>
      <div className={styles.data_box}>
        <img className={styles.img} src={wishData.image} alt="Фото подарка." />
        <div className={styles.gift_data}>
          <h2 className="text text_type_h1 mb-16">{`${wishData.price} руб.`}</h2>

          <p className="text text_type_main" style={{ maxWidth: "75%" }}>
            {`Добавлено ${new Date(
              wishData.createdAt
            ).toLocaleDateString()} пользователем `}
            <NavLink
              to={`/users/${wishData?.owner?.username}`}
              className={`text text_type_main text_color_primary ${styles.link}`}
            >
              {`${wishData?.owner?.username} ${"\u{2197}"}`}
            </NavLink>
          </p>
          <p
            className="text text_type_main"
            style={{ maxWidth: "75%" }}
          >{`Описание: ${wishData.description}`}</p>
          <LoadingBox
            current={wishData.raised}
            total={wishData.price}
            extraClass={styles.load}
          />
          <div className={styles.btns_box}>
            <Button
              type="support"
              kind="thirdly"
              text="Перейти в магазин"
              extraClass={styles.btn}
              onClick={handleGoToShop}
            />
            <Button
              type="button"
              kind="secondary"
              text="Поддержать"
              extraClass={styles.btn}
              onClick={handlePopupOpen}
              disabled={isRaised}
            />
            <Button
              type="button"
              kind="support"
              text="Добавить в вишлист"
              extraClass={styles.btn}
              onClick={handleCopyClick}
              disabled={isAddToWishDisabled}
            />
          </div>
        </div>
      </div>
      <div className={styles.supported_box}>
        <div className={styles.subtitle_box}>
          <h2 className="text text_ty-e_h2">Список поддержавших</h2>
        </div>
        {wishData?.offers?.length ? (
          wishData?.offers?.map(({ name, amount, createdAt }) => (
            <UserSupportedCard name={name} amount={amount} date={createdAt} />
          ))
        ) : (
          <p>Пока никого нет</p>
        )}
      </div>

      {isPopupOpen && (
        <Modal
          onClose={handlePopupClose}
          extraClass={styles.modal}
          isCloseBtn={true}
        >
          <div className={styles.popup}>
            <h2 className="text text_type_h2 mb-20">Поддержите любой суммой</h2>
            <div className={`mb-20 ${styles.gift_btns_box}`}>
              {priceArr.map((item, index) => {
                return (
                  <Button
                    key={index}
                    id={item}
                    type="button"
                    extraClass={styles.price_btn}
                    text={`${item} руб`}
                    kind={
                      currentSupportedBtn === item ||
                      currentSupportedBtn === anotherSum
                        ? "primary"
                        : "support"
                    }
                    onClick={handleSupportedBtnsClick}
                  />
                );
              })}
              <Input
                type="number"
                extraInputClass={styles.price_input}
                placeholder="Сумма"
                value={anotherSum}
                onChange={handleChangeInput}
              />
            </div>
            <Button
              type="button"
              kind="secondary"
              text="Поддержать"
              onClick={handleSupportClick}
              extraClass={styles.supported_btn}
            />
            {errorMessage && (
              <span className={styles.error}>{errorMessage}</span>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
};
