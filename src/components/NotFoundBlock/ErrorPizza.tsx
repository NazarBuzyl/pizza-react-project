import React from "react";

import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Nothing found
      </h1>
      <p className={styles.description}>
        Sorry, an error occurred. Please visit our our online store later.
      </p>
    </div>
  );
}
