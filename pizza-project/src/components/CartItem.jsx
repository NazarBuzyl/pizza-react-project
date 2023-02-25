import React from "react";
import PlusMinusCrossSvg from "./common/PlusMinusCrossSvg";

export default function CartItem() {
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img
          className="pizza-block__image"
          src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
          alt="Pizza"
        />
      </div>
      <div className="cart__item-info">
        <h3>Sweet-sour chicken</h3>
        <p>thin dough, 26 sm.</p>
      </div>
      <div className="cart__item-count">
        <div className="button button--outline button--circle cart__item-count-minus">
          <PlusMinusCrossSvg />
        </div>
        <b>2</b>
        <div className="button button--outline button--circle cart__item-count-plus">
          <PlusMinusCrossSvg />
        </div>
      </div>
      <div className="cart__item-price">
        <b>42.4 $</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle">
          <PlusMinusCrossSvg />
        </div>
      </div>
    </div>
  );
}
