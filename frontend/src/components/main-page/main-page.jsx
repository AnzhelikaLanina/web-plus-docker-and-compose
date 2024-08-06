import { useState, useEffect, useContext } from "react";
import { Route, useRouteMatch, useLocation, Redirect } from "react-router-dom";

import { Collection } from "../collection";
import { Subheader } from "./subheader";
import { CollectionsView } from "./collections-view";
import { CardListView } from "./card-lists-view";

import { getLastCards, getOwnWishes, getTopCards } from "../../utils/api";
import { findOwnedIds } from "../../utils/functions";
import { UserContext } from "../../utils/context";

import styles from "./main-page.module.css";

export const MainPage = ({ extraClass = "" }) => {
  const [user] = useContext(UserContext);
  const [lastCards, setLastCards] = useState([]);
  const [topCards, setTopCards] = useState([]);
  const [ownWishes, setOwnWishes] = useState([]);

  const { path, url } = useRouteMatch();
  const location = useLocation();
  const isLogin = !!user.id;

  useEffect(() => {
    Promise.all([getLastCards(), getTopCards(), getOwnWishes()]).then(
      ([last, top, ownWishes]) => {
        setLastCards(last);
        setTopCards(top);
        setOwnWishes(ownWishes);
      }
    );
  }, []);

  const ownedTopCardsIds = findOwnedIds(ownWishes, topCards);
  const ownedLastCardsIds = findOwnedIds(ownWishes, lastCards);

  const linePath = `${path}/line`;
  const collectionsPath = `${path}/collections`;

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <Subheader path={path} location={location} isLogin={isLogin} />
      <Route
        path={linePath}
        render={() => (
          <CardListView
            lastCards={lastCards}
            topCards={topCards}
            isLogin={isLogin}
            ownedTopCards={ownedTopCardsIds}
            ownedLastCards={ownedLastCardsIds}
          />
        )}
      />
      <Route
        exact
        path={collectionsPath}
        render={() => <CollectionsView url={url} ownWishes={ownWishes} />}
      />
      <Route path={`${path}/collections/:id`} render={() => <Collection />} />
    </div>
  );
};
