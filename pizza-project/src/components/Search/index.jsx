import React, { useContext, useRef } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";

import { SearchContext } from "../../App";
import SearchIcon from "../common/SearchSvg";

export default function Search() {
  const [value, setValue] = React.useState("");
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setValue("");
    setSearchValue("");
    inputRef.current.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 500),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <SearchIcon />
      </div>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Search pizza..."
      />
      <div className={styles.clearIcon}>
        {searchValue ? (
          <svg
            onClick={onClickClear}
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
