import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { updateFilters } from "../redux/filterSlice";
import { selectCart } from "../redux/cartSlice";

import logoSvg from "../assets/img/pizza-logo.svg";
import Search from "./Search";
import CartSvg from "../components/common/CartSvg";

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { totalPrice, totalCount } = useSelector(selectCart);
  const onUpdatePage = () => {
    dispatch(updateFilters());
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo-link">
          <div onClick={onUpdatePage} className="header__logo">
            <img
              className="header__logo-img"
              width="38"
              src={logoSvg}
              alt="Pizza logo"
            />
            <div className="header__logo-content">
              <h1 className="header__logo-title">Pizza</h1>
              <div className="header__logo-description">
                The most delicious pizza in the universe
              </div>
            </div>
          </div>
        </Link>
        {location.pathname !== "/cart" ? (
          <>
            <div className="header__search">
              <Search />
            </div>
            <div className="header__cart">
              <Link to="/cart" className="button button--cart">
                <span className="button--cart__span">{totalPrice}$</span>
                <div className="button--delimiter"></div>
                <div className="button--cart__logo">
                  <CartSvg />
                </div>
                <span className="button--cart__span">{totalCount}</span>
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
