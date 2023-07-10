import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDataSort } from "../redux/filterSlice";

import ArrowTopSvg from "./common/ArrowTopSvg";

export const sortList = [
  { value: "popularity", sortProperty: "rating", orderProperty: "desc" },
  {
    value: "price: high to low",
    sortProperty: "price",
    orderProperty: "desc",
  },
  {
    value: "price: low to high",
    sortProperty: "price",
    orderProperty: "asc",
  },
  { value: "alphabetical: A-Z", sortProperty: "name", orderProperty: "asc" },
  { value: "alphabetical: Z-A", sortProperty: "name", orderProperty: "desc" },
];

export default function Sort() {
  const dispatch = useDispatch();
  const dataSort = useSelector((state) => state.filterReducer.dataSort);
  const sortRef = React.useRef();

  const [open, setOpen] = useState(false);

  const onClickSortItem = (index) => {
    dispatch(setDataSort(index));
    setOpen(!open);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
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
}
