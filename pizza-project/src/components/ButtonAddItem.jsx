import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, selectCartItemById } from "../redux/cartSlice";

import PlusMinusCrossSvg from "./common/PlusMinusCrossSvg";

export default function ButtonAddItem({
  id,
  imageUrl,
  name,
  type,
  size,
  price,
  activeIndexType,
  activeIndexSize,
}) {
  const dispatch = useDispatch();
  const addedCount = useSelector(
    selectCartItemById(id, activeIndexType, activeIndexSize)
  );

  const onClickAdd = () => {
    const item = {
      id: `${id}#${activeIndexType}#${activeIndexSize}`,
      name,
      price,
      imageUrl,
      type,
      size,
    };
    dispatch(addItem(item));
  };

  return (
    <div onClick={onClickAdd} className="button button--outline button--add">
      <PlusMinusCrossSvg />
      <span>Add</span>
      {addedCount && <i>{addedCount.count}</i>}
    </div>
  );
}
