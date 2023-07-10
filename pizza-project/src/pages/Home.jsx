import React, { useState, useEffect, useContext } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setFilters } from "../redux/filterSlice";
import axios from "axios";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaPagination from "../components/PizzaPagination";

import { SearchContext } from "../App";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  // Redux
  const categoryId = useSelector((state) => state.filterReducer.categoryId);
  const dataSort = useSelector((state) => state.filterReducer.dataSort);
  const currentPage = useSelector((state) => state.filterReducer.currentPage);

  // useState
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  // useContext
  const { searchValue } = useContext(SearchContext);

  const fetchPizzas = () => {
    axios
      .get(
        `https://63fa119d473885d837d7da72.mockapi.io/items?page=${currentPage}&limit=8${
          categoryId > 0 ? `&category=${categoryId}` : ""
        }&sortBy=${dataSort.sortProperty}&order=${dataSort.orderProperty}${
          searchValue ? `&search=${searchValue}` : ""
        }`
      )
      .then((res) => {
        setData(res.data);
        setIsloading(false);
      });
  };

  // if there was a first render, then we check the URL-parameters and save them in Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) =>
          obj.sortProperty === params.sortProperty &&
          obj.orderProperty === params.orderProperty
      );

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, [dispatch]);

  //if there was a first render, then we request a pizza
  useEffect(() => {
    window.scrollTo(0, 0);

    if (isSearch) {
      setIsloading(true);
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, dataSort, searchValue, currentPage]);

  // Add our filters to the URL line
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: dataSort.sortProperty,
        orderProperty: dataSort.orderProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, dataSort, currentPage, navigate]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizza</h2>
      <div className="content__offer">
        {isLoading
          ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)
          : data.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <PizzaPagination />
    </>
  );
}
