import { useMemo } from "react";

import { paginationCalculation } from "utils/paginationCalculation";

interface IUsePagination {
  totalCount: number;
  currentPage: number;
}

export const usePagination = ({ totalCount, currentPage }: IUsePagination) => {
  const siblingCount = 1;
  const paginationRange = useMemo(
    () => paginationCalculation(totalCount, siblingCount, currentPage),
    [totalCount, currentPage]
  );
  return paginationRange;
};
