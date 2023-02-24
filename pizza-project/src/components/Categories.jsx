import React from "react";

export default function Categories() {
  return (
    <div className="categories">
      <ul className="categories__list">
        <li className="categories__list-item active">All</li>
        <li className="categories__list-item">Meat</li>
        <li className="categories__list-item">Vegetarian</li>
        <li className="categories__list-item">Grill</li>
        <li className="categories__list-item">Spicy</li>
      </ul>
    </div>
  );
}
