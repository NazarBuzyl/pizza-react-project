import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/filterSlice";

export default function Categories() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterReducer.categoryId);

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
            onClick={() => dispatch(setCategoryId(index))}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
