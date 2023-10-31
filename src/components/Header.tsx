import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// ---------------------------------------------------------------- import Redux ----------------------------------------------------------------
import { selectCart } from "../redux/cartSlice";
// ---------------------------------------------------------------- import Components ----------------------------------------------------------------
import Search from "./Search";
// ---------------------------------------------------------------- import SVG ----------------------------------------------------------------
import CartSvg from "./common/CartSvg";
import logoSvg from "../assets/img/pizza-logo.svg";

// ---------------------------------------------------------------- MAIN ----------------------------------------------------------------
const Header: React.FC = () => {
  const location = useLocation();
  const isMounted = React.useRef(false);
  const { items, totalPrice, totalCount } = useSelector(selectCart);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      window.localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo-link">
          <div className="header__logo">
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
};

export default Header;
