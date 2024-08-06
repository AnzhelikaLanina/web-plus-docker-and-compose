import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory, Route } from "react-router-dom";

import { Button, ButtonReturn } from "../ui";

import styles from "./main-page.module.css";

export const Subheader = ({ path, isLogin }) => {
  const { pathname } = useLocation();
  const [, , tab] = pathname.split("/");
  const [activeTab, setActiveTab] = useState(tab);
  const history = useHistory();

  const onTabsClick = (e) => {
    const name = e.target.name ?? e.target.closest("button").name;
    history.push(`/gifts/${name}`);
    setActiveTab(name);
  };

  return (
    <div className={styles.tabs_box}>
      <Route path={`${path}/collections/:id`}>
        <ButtonReturn />
      </Route>
      <h1
        className={`text text_type_h1 text_color_primary mb-16 ${styles.title}`}
      >
        Подарки
      </h1>
      <div className={styles.tabs}>
        <Button
          kind={activeTab === "line" ? "secondary" : "tab"}
          type="button"
          name="line"
          text="Лента"
          extraClass={styles.tab}
          onClick={onTabsClick}
        />
        <Button
          kind={activeTab === "collections" ? "secondary" : "tab"}
          type="button"
          name="collections"
          text="Коллекции"
          extraClass={styles.tab}
          onClick={onTabsClick}
          disabled={!isLogin}
        />
      </div>
    </div>
  );
};
