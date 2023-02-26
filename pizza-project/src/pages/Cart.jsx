import React from "react";
import { Link } from "react-router-dom";
import CartEmpty from "../components/CartEmpty";
import CartItem from "../components/CartItem";

import TrashSvg from "../components/common/TrashSvg";
import CartSvg from "../components/common/CartSvg";
import ArrowSvg from "../components/common/ArrowSvg";

export default function Cart() {
  return (
    <>
      <div className="container container--cart">
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
              <CartSvg />
              Cart
            </h2>
            <div className="cart__clear">
              <TrashSvg />
              <span>Clear cart</span>
            </div>
          </div>
          <div className="content__items">
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                Total pizzas: <b>3 pcs.</b>
              </span>
              <span>
                Order price: <b>150 $</b>
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
      <CartEmpty />
    </>
  );
}
