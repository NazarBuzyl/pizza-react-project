import React from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PizzaPagination({
  currentPage,
  onChangePage,
  countPage,
}) {
  return (
    <Stack spacing={2}>
      <Pagination
        page={currentPage}
        onChange={(e, value) => onChangePage(value)}
        count={countPage}
      />
    </Stack>
  );
}
