import React from "react";
import { useDispatch } from "react-redux";

// ---------------------------------------------------------------- import SVG ----------------------------------------------------------------
import PlusMinusCrossSvg from "./common/PlusMinusCrossSvg";
// ---------------------------------------------------------------- import Redux ----------------------------------------------------------------
import { removeItem, addItem, minusItem, CartItemType } from "../redux/cartSlice";
import { typesName } from "../pages/PizzaPage";

type CartItemProps = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  type: number;
  size: number;
  count: number;
}

// ---------------------------------------------------------------- MAIN ----------------------------------------------------------------
const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  imageUrl,
  type,
  size,
  count,
}) => {
  const dispatch = useDispatch();

  const onClickMinus = () => dispatch(minusItem(id));
  const onClickAdd = () => dispatch(addItem({id} as CartItemType));
  const onClickRemove = () => dispatch(removeItem(id));

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

export default CartItem;