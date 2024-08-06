import React from "react";
import { useHistory } from "react-router-dom";

import { Input, Button } from "../ui";

import { queryUser } from "../../utils/api";

import styles from "./search-bar.module.css";

export const SearchBar = ({ query, changeQuery, setQueryHits }) => {
  const history = useHistory();

  const queryForUsers = (event) => {
    event.preventDefault();
    queryUser(query).then((hits) => setQueryHits({ query, hits }));
    history.push("/search");
  };

  return (
    <form className={`pt-16 ${styles.searchBar}`} onSubmit={queryForUsers}>
      <Input
        value={query}
        onChange={changeQuery}
        extraClass={`pr-8 ${styles.searchBar__input}`}
        placeholder="Найти пользователя"
      />

      <Button text="Искать" kind="secondary" type="submit" />
    </form>
  );
};
