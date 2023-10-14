import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// ---------------------------------------------------------------- Components ----------------------------------------------------------------
import CartEmpty from "../components/CartEmpty";
import CartItem from "../components/CartItem";
// ---------------------------------------------------------------- SVG ----------------------------------------------------------------
import TrashSvg from "../components/common/TrashSvg";
import CartSvg from "../components/common/CartSvg";
import ArrowSvg from "../components/common/ArrowSvg";
// ---------------------------------------------------------------- Redux ----------------------------------------------------------------
import { clearItems, selectCart } from "../redux/cartSlice";

// ---------------------------------------------------------------- MAIN ----------------------------------------------------------------
const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalCount, totalPrice, items } = useSelector(selectCart);
  const onClickClear = () => dispatch(clearItems());

  if (!totalCount) {
    return <CartEmpty />;
  }

  return (
    <>
      <div className="container--cart">
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
              <CartSvg />
              Cart
            </h2>
            <div onClick={onClickClear} className="cart__clear">
              <TrashSvg />
              <span>Clear cart</span>
            </div>
          </div>
          <div className="content__items">
            {items.map((obj: any) => (
              <CartItem key={obj.id} {...obj} />
            ))}
          </div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                Total pizzas: <b>{totalCount} pcs.</b>
              </span>
              <span>
                Order price: <b>{totalPrice} $</b>
              </span>
            </div>
            <div className="cart__bottom-buttons">
              <Link
                to="/"
                className="button button--outline button--add go-back-btn"
              >
                <ArrowSvg />
                <span>Вack</span>
              </Link>
              <div className="button pay-btn">
                <span>Pay now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
