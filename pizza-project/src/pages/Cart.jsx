import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartEmpty from "../components/CartEmpty";
import CartItem from "../components/CartItem";

import TrashSvg from "../components/common/TrashSvg";
import CartSvg from "../components/common/CartSvg";
import ArrowSvg from "../components/common/ArrowSvg";

import { clearItems, selectCart } from "../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { totalCount, totalPrice, items } = useSelector(selectCart);
  const onClickClear = () => dispatch(clearItems());

  return (
    <>
      {!items.length > 0 ? (
        <CartEmpty />
      ) : (
        <div className="container container--cart">
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
              {items.map((obj) => (
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
      )}
    </>
  );
}
