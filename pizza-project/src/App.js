import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFoundPage";
import FullPizza from "./pages/FullPizza";

export const SearchContext = React.createContext();

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
