import React, { useContext } from "react";
import styles from "./Search.module.scss";

import { SearchContext } from "../../App";
import SearchIcon from "../common/SearchSvg";

export default function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <SearchIcon />
      </div>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        placeholder="Search pizza..."
      />
      <div className={styles.clearIcon}>
        {searchValue ? (
          <svg
            onClick={() => setSearchValue("")}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
