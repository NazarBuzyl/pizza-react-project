import React, { useState, useEffect } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaPagination from "../components/PizzaPagination";

export default function Home(props) {
  const { searchValue } = props;
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [dataSort, setDataSort] = useState({
    value: "popularity",
    sortProperty: "rating",
    orderProperty: "desc",
  });

  useEffect(() => {
    setIsloading(true);
    fetch(
      `https://63fa119d473885d837d7da72.mockapi.io/items?page=${currentPage}&limit=8${
        categoryId > 0 ? `&category=${categoryId}` : ""
      }&sortBy=${dataSort.sortProperty}&order=${dataSort.orderProperty}${
        searchValue ? `&search=${searchValue}` : ""
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsloading(false);
      })
      .catch((err) => console.warn(err));
    window.scrollTo(0, 0);
  }, [categoryId, dataSort, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories
          valueId={categoryId}
          onChangeCategory={(index) => {
            setCurrentPage(1);
            setCategoryId(index);
          }}
        />
        <Sort
          dataSort={dataSort}
          onChangeDataSort={(index) => {
            setCurrentPage(1);
            setDataSort(index);
          }}
        />
      </div>
      <h2 className="content__title">All pizza</h2>
      <div className="content__offer">
        {isLoading
          ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)
          : data.map((obj) => <PizzaBlock key={obj.id} data={obj} />)}
      </div>
      <PizzaPagination
        currentPage={currentPage}
        onChangePage={(e, value) => setCurrentPage(value)}
      />
    </>
  );
}
