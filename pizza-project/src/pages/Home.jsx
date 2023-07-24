/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filterSlice";
import { fetchPizzas, selectPizzasData } from "../redux/pizzasSlice";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import ErrorPizza from "../components/NotFoundBlock/ErrorPizza";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaPagination from "../components/PizzaPagination";

// import { SearchContext } from "../App";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);

  // Redux
  const { categoryId, dataSort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzasData);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // useContext
  // const { searchValue } = React.useContext(SearchContext);

  //FetchPizzas
  const getPizzas = async () => {
    const sortProperty = dataSort.sortProperty;
    const orderProperty = dataSort.orderProperty;

    await dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
        categoryId,
        sortProperty,
        orderProperty,
        searchValue,
      })
    );

    window.scrollTo(0, 0);
  };

  // Add our filters to the URL line
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        search: searchValue,
        sortProperty: dataSort.sortProperty,
        orderProperty: dataSort.orderProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    getPizzas();
  }, [categoryId, dataSort, currentPage, searchValue]);

  // if there was a first render, then we check the URL-parameters and save them in Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) =>
          obj.sortProperty === params.sortProperty &&
          obj.orderProperty === params.orderProperty
      );

      dispatch(setFilters({ ...params, sort }));
    }
    isMounted.current = true;
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort dataSort={dataSort} />
      </div>
      {status === "error" ? (
        <ErrorPizza />
      ) : (
        <>
          <h2 className="content__title">All pizza</h2>
          <div className="content__offer">
            {status === "loading"
              ? [...new Array(12)].map((_, index) => (
                  <PizzaSkeleton key={index} />
                ))
              : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
        </>
      )}
      {status === "success" && (
        <PizzaPagination
          currentPage={currentPage}
          onChangePage={onChangePage}
          countPage={5}
        />
      )}
    </>
  );
}
