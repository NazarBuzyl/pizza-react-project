import React from "react";

export default function Categories({ categoryId, onChangeCategory }) {
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
        {categoriesList.map((categoryName, index) => (
          <li
            key={index}
            className={`categories__list-item ${
              categoryId === index ? "active" : ""
            }`}
            onClick={() => onChangeCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
