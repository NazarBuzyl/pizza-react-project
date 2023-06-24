import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/filterSlice";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PizzaPagination(props) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);

  return (
    <Stack spacing={2}>
      <Pagination
        page={currentPage}
        onChange={(e, value) => dispatch(setCurrentPage(value))}
        count={6}
      />
    </Stack>
  );
}
