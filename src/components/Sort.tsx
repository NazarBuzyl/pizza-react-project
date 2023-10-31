import React, { useState } from "react";
import { useDispatch } from "react-redux";

// ---------------------------------------------------------------- import Redux ----------------------------------------------------------------
import { DataSort, setDataSort, sortList } from "../redux/filterSlice";
// ---------------------------------------------------------------- import SVG ----------------------------------------------------------------
import ArrowTopSvg from "./common/ArrowTopSvg";

// ---------------------------------------------------------------- MAIN ----------------------------------------------------------------
const Sort: React.FC<any> = ({ dataSort }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickSortItem = (obj: DataSort) => {
    dispatch(setDataSort(obj));
    setOpen(!open);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div onClick={() => setOpen(!open)} className="sort__label">
        <div className="sort__label-svg">
          <ArrowTopSvg />
        </div>
        <b className="sort__label-b">Sort by:</b>
        <span className="sort__label-span"> {dataSort.value}</span>
      </div>
      <div className={`sort__popup ${open ? "active" : ""}`}>
        <ul className="sort__popup-list">
          {sortList.map((item, index) => (
            <li
              key={index}
              className={`sort__popup-item ${
                dataSort.value === item.value ? "active" : ""
              }`}
              onClick={() => onClickSortItem(item)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sort;
