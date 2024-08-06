import React from "react";

import styles from "./loading-box.module.css";

export const LoadingBox = ({ current = 0, total = 1000, extraClass = "" }) => {
  const loadingWidh = `${Math.ceil((current / total) * 100)}%`;

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <div className={`${styles.loading_box}`}>
        <div className={styles.loading} style={{ width: loadingWidh }} />
      </div>
      <p className={`text text_type_main text_color_primary mt-8`}>
        {`Собрано: ${current}/${total} руб.`}
      </p>
    </div>
  );
};
