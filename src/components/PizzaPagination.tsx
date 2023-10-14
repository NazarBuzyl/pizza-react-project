import React from "react";

// ---------------------------------------------------------------- import MUI Components ----------------------------------------------------------------
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

type PizzaPaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
  countPage: number;
};

// ---------------------------------------------------------------- MAIN ----------------------------------------------------------------
const PizzaPagination: React.FC<PizzaPaginationProps> = ({
  currentPage,
  onChangePage,
  countPage,
}) => {
  return (
    <Stack spacing={2}>
      <Pagination
        page={currentPage}
        onChange={(e, value) => onChangePage(value)}
        count={countPage}
      />
    </Stack>
  );
};

export default PizzaPagination;