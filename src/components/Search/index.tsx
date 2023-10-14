import React from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";

// ---------------------------------------------------------------- Redux ----------------------------------------------------------------
import { setSearchValue, updateFilters } from "../../redux/filterSlice";
// ---------------------------------------------------------------- SVG  ----------------------------------------------------------------
import SearchIcon from "../common/SearchSvg";


// ---------------------------------------------------------------- MAIN ----------------------------------------------------------------
const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue("");
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = React.useCallback(
    debounce((value: string) => {
      dispatch(updateFilters());
      dispatch(setSearchValue(value));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
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
        {value ? (
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

export default Search;