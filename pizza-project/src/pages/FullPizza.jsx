/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function FullPizza() {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63fa119d473885d837d7da72.mockapi.io/items?id=${id}`
        );
        setPizza(data[0]);
        console.log(data);
        if (!data[0]) navigate("/");
      } catch (err) {
        alert(err);
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "Loading...";
  }

  return (
    <div className="pizza-content container">
      <img src={pizza.imageUrl} alt="pi" />
      <h2 className="pizza-title">pizza.title</h2>
      <p className="pizza-description"></p>
      <p className="pizza-price">{pizza.price}</p>
    </div>
  );
}
