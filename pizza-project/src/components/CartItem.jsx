import React from "react";
import { useDispatch } from "react-redux";
import PlusMinusCrossSvg from "./common/PlusMinusCrossSvg";
import { removeItem, addItem, minusItem } from "../redux/cartSlice";

export default function CartItem({
  id,
  name,
  price,
  imageUrl,
  type,
  size,
  count,
}) {
  const dispatch = useDispatch();

  const onClickMinus = () => dispatch(minusItem({ id }));
  const onClickAdd = () => dispatch(addItem({ id }));
  const onClickRemove = () => dispatch(removeItem({ id }));

  const typesName = ["thin", "standart"];
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt={name} />
      </div>
      <div className="cart__item-info">
        <h3>{name}</h3>
        <p>
          {typesName[type]} dough, {size} sm.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <PlusMinusCrossSvg />
        </div>
        <b>{count}</b>
        <div
          onClick={onClickAdd}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <PlusMinusCrossSvg />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} $</b>
      </div>
      <div onClick={onClickRemove} className="cart__item-remove">
        <div className="button button--outline button--circle">
          <PlusMinusCrossSvg />
        </div>
      </div>
    </div>
  );
}
