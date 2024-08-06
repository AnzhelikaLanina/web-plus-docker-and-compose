import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./search-box.module.css";

export const SearchBox = ({
  search,
  setSearch,
  placeholder = "Подарок 1",
  extraClass = "",
}) => {
  const [currentSearch, setCurrentSearch] = React.useState("");

  const history = useHistory();

  const handleChangeInput = (e) => {
    setCurrentSearch(e.target.value);
  };

  const handleSearch = () => {
    if (currentSearch) {
      setSearch(currentSearch);
      history.push("/search");
    }
  };

  React.useEffect(() => {
    setCurrentSearch(search);
  }, [search]);

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <Input
        type="search"
        placeholder={placeholder}
        id={99}
        extraClass={`mr-5 ${styles.input}`}
        onChange={handleChangeInput}
      />
      <Button
        type="button"
        kind="secondary"
        text="Искать"
        extraClass={styles.btn}
        onClick={handleSearch}
      />
    </div>
  );
};
