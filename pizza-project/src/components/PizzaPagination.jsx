import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PizzaPagination(props) {
  const { currentPage, onChangePage } = props;
  return (
    <Stack spacing={2}>
      <Pagination page={currentPage} onChange={onChangePage} count={6} />
    </Stack>
  );
}
