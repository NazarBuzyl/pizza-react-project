import React, { useState } from "react";

export default function Categories() {
  const [activeIndexCategory, setactiveIndexCategory] = useState(0);

  const categoriesList = [
    "All",
    "Meat",
    "Vegetarian",
    "Grill",
    "Spicy",
    "Fruit",
  ];

  return (
    <div className="categories">
      <ul className="categories__list">
        {categoriesList.map((category, index) => (
          <li
            key={index}
            className={`categories__list-item ${
              activeIndexCategory === index ? "active" : ""
            }`}
            onClick={() => setactiveIndexCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
