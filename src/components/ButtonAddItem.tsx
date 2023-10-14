import React from "react";
import { useSelector, useDispatch } from "react-redux";

// ---------------------------------------------------------------- import Redux ----------------------------------------------------------------
import { CartItemType, addItem, selectCartItemById } from "../redux/cartSlice";
// ---------------------------------------------------------------- import SVG ----------------------------------------------------------------
import PlusMinusCrossSvg from "./common/PlusMinusCrossSvg";

type ButtonAddItemProps = {
  id: string;
  imageUrl: string;
  name: string;
  type: number;
  size: number;
  price: number;
  activeIndexType: number;
  activeIndexSize: number;
};

// ---------------------------------------------------------------- MAIN ----------------------------------------------------------------
const ButtonAddItem: React.FC<ButtonAddItemProps> = ({
  id,
  imageUrl,
  name,
  type,
  size,
  price,
  activeIndexType,
  activeIndexSize,
}) => {
  const dispatch = useDispatch();
  const addedCount = useSelector(
    selectCartItemById(id, activeIndexType, activeIndexSize)
  );

  const onClickAdd = () => {
    const item: CartItemType = {
      id: `${id}#${activeIndexType}#${activeIndexSize}`,
      name,
      price,
      imageUrl,
      type,
      size,
      count: 0,
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
};

export default ButtonAddItem;
