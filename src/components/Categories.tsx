import React from "react";
import { categoriesList } from "../pages/PizzaPage";

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (id: number) => void;
};

// ---------------------------------------------------------------- MAIN ----------------------------------------------------------------
const Categories: React.FC<CategoriesProps> = ({
  categoryId,
  onChangeCategory,
}) => {
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
};

export default Categories;
