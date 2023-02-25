import React, { useState } from "react";

export default function PizzaBlock(props) {
  const { id, imageUrl, name, types, sizes, price, category, rating } =
    props.data;

  const [activeIndexType, setActiveIndexType] = useState(types[0]);
  const [activeIndexSize, setActiveIndexSize] = useState(0);

  const typesName = ["thin", "standart"];

  const onAddCart = () => {};

  console.log(id, category, rating);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <div className="pizza-block_image-block">
          <img className="pizza-block__image" src={imageUrl} alt={name} />
        </div>
        <h4 className="pizza-block__title">{name}</h4>
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
            <div
              onClick={() => onAddCart()}
              className="button button--outline button--add"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Add</span>
              <i>2</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
