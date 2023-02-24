import React from "react";
import arrowTop from "../assets/img/arrow-top.svg";

export default function Sort() {
  return (
    <div className="sort">
      <div className="sort__label">
        <img className="sort__label-svg" src={arrowTop} alt="arrow-top" />
        <b className="sort__label-b">Sort by:</b>
        <span className="sort__label-span">popularity</span>
      </div>
      <div class="sort__popup">
        <ul className="sort__popup-list">
          <li className="sort__popup-item active">popularity</li>
          <li className="sort__popup-item">price: high to low</li>
          <li className="sort__popup-item">price: low to high</li>
          <li className="sort__popup-item">alphabetical: A-Z</li>
          <li className="sort__popup-item">alphabetical: Z-A</li>
        </ul>
      </div>
    </div>
  );
}
