import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonAddItem from "../ButtonAddItem";

export default function PizzaBlock({
  id,
  imageUrl,
  name,
  types,
  sizes,
  price,
}) {
  const [activeIndexType, setActiveIndexType] = useState(types[0]);
  const [activeIndexSize, setActiveIndexSize] = useState(0);
  const typesName = ["thin", "standart"];

  const buttonData = {
    id,
    imageUrl,
    name,
    size: sizes[activeIndexSize],
    type: activeIndexType,
    price,
    activeIndexType,
    activeIndexSize,
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <div className="pizza-block_image-block">
            <img className="pizza-block__image" src={imageUrl} alt={name} />
          </div>
          <h4 className="pizza-block__title">{name}</h4>
        </Link>
        <div>
          <div className="pizza-block__selector">
            <ul className="pizza-block__selector-list">
              {types.map((type, index) => (
                <li
                  onClick={() => setActiveIndexType(type)}
                  key={index}
                  className={`pizza-block__selector-item ${
                    activeIndexType === type ? "active" : ""
                  }`}
                >
                  {typesName[type]}
                </li>
              ))}
            </ul>
            <ul className="pizza-block__selector-list">
              {sizes.map((size, index) => {
                return (
                  <li
                    onClick={() => setActiveIndexSize(index)}
                    key={index}
                    className={`pizza-block__selector-item ${
                      activeIndexSize === index ? "active" : ""
                    }`}
                  >
                    {size}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">{price} $</div>
            <ButtonAddItem {...buttonData} />
          </div>
        </div>
      </div>
    </div>
  );
}
