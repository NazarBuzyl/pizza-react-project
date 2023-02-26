import React, { useState } from "react";
import ArrowTopSvg from "./common/ArrowTopSvg";

export default function Sort(props) {
  const { dataSort, onChangeDataSort } = props;
  const [open, setOpen] = useState(false);

  const sortList = [
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
    { value: "alphabetical: A-Z", sortProperty: "name", orderProperty: "desc" },
    { value: "alphabetical: Z-A", sortProperty: "name", orderProperty: "asc" },
  ];

  const onClickSortItem = (index) => {
    onChangeDataSort(index);
    setOpen(!open);
  };

  return (
    <div className="sort">
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
