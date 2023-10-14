/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// ---------------------------------------------------------------- import Components ----------------------------------------------------------------
import ButtonAddItem from "../components/ButtonAddItem";
// ---------------------------------------------------------------- import MUI ----------------------------------------------------------------
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

// ---------------------------------------------------------------- const Arrays ----------------------------------------------------------------
export const typesName = ["thin", "standart"];
export const categoriesList = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Fruit"];

// ---------------------------------------------------------------- MAIN ----------------------------------------------------------------
const PizzaPage: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    name: string;
    price: number;
    rating: number;
    category: number;
    types: number[];
    sizes: number[];
  }>();
  const [activeIndexType, setActiveIndexType] = React.useState(0);
  const [activeIndexSize, setActiveIndexSize] = React.useState(0);

  const { id = "" } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63fa119d473885d837d7da72.mockapi.io/items?page=1&limit=1&id=${id}`
        );
        setPizza(data[0]);
        setActiveIndexType(data[0].types[0]);
        console.log(data);

        if (!data[0]) {
          alert("No pizza found");
          navigate("/");
        }
      } catch (err) {
        alert(err);
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  const buttonData = {
    id,
    imageUrl: pizza.imageUrl,
    name: pizza.name,
    type: activeIndexType,
    size: pizza.sizes[activeIndexSize],
    price: pizza.price,
    activeIndexType,
    activeIndexSize,
  };

  return (
    <div className=" pizza-page__wrapper flex-container">
      <div className="pizza-page__image-block">
        <img
          className="pizza-page__image"
          src={pizza.imageUrl}
          alt={pizza.name}
        />
      </div>
      <div className="pizza-page__info-block">
        <div>
          <h2 className="pizza-page__title">{pizza.name}</h2>
          <div className="pizza-page__categorie">
            {categoriesList[pizza.category]}
          </div>
          <div className="pizza-page__rating">
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={pizza.rating / 2}
                precision={0.5}
                readOnly
              />
            </Stack>
          </div>
          <div className="pizza-page__selector">
            <ul className="pizza-page__selector-list">
              {pizza.types.map((type, index) => (
                <li
                  onClick={() => setActiveIndexType(type)}
                  key={index}
                  className={`pizza-page__selector-item ${
                    activeIndexType === type ? "active" : ""
                  }`}
                >
                  {typesName[type]}
                </li>
              ))}
            </ul>
            <ul className="pizza-page__selector-list">
              {pizza.sizes.map((size, index) => {
                return (
                  <li
                    onClick={() => setActiveIndexSize(index)}
                    key={index}
                    className={`pizza-page__selector-item ${
                      activeIndexSize === index ? "active" : ""
                    }`}
                  >
                    {size}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="pizza-page__price-block">
          <div className="pizza-page__price">{pizza.price} $</div>
          <ButtonAddItem {...buttonData} />
        </div>
        {/* <div className="pizza-page__delivery-info"></div> */}
      </div>
      <p className="pizza-page__description"></p>
    </div>
  );
};

export default PizzaPage;
