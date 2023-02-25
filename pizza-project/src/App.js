import React, { useState, useEffect } from "react";

import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import PizzaSkeleton from "./components/PizzaBlock/PizzaSkeleton";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    fetch("https://63fa119d473885d837d7da72.mockapi.io/items")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsloading(false);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="page">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">All pizza</h2>
            <div className="content__offer">
              {isLoading
                ? [...new Array(6)].map((_, index) => (
                    <PizzaSkeleton key={index} />
                  ))
                : data.map((obj) => (
                    // <PizzaSkeleton />
                    <PizzaBlock key={obj.id} data={obj} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
