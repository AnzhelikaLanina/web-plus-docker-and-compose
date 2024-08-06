import React from "react";

import { UserSearchCard } from "../user-search-card";

import styles from "./search-page.module.css";

export const SearchPage = ({ extraClass = "", queryHits }) => {
  const hitsCount = queryHits.hits.length || 0;

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <h1 className={`text text_type_h1 text_color_primary ${styles.title}`}>
        {`Результаты поиска "${queryHits.query}"`}
      </h1>
      <h2
        className={`text text_type_h2 text_color_primary mb-16 ${styles.description}`}
      >
        {`${hitsCount} ${pluralize(hitsCount)}`}
      </h2>
      <div className={styles.cards_box}>
        {queryHits?.hits?.map(({ username, avatar, id }) => (
          <UserSearchCard name={username} img={avatar} key={id} />
        ))}
      </div>
    </section>
  );
};

const pluralize = (count) => {
  const resultsArr = ["результат", "результата", "результатов"];
  const meaningfulDigit = count % 10;

  const pluralizer =
    meaningfulDigit === 1
      ? resultsArr[0]
      : meaningfulDigit > 1 && meaningfulDigit < 5
      ? resultsArr[1]
      : resultsArr[2];

  return pluralizer;
};
