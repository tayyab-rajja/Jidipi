import clsx from "clsx";
import { FC } from "react";

import { usePagination } from "./usePagination";

import styles from "./Pagination.module.css";

interface PaginationProps {
  onChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({
  onChange,
  totalCount,
  siblingCount = 1,
  pageSize,
  currentPage,
}) => {
  const paginationRange = usePagination({
    siblingCount,
    currentPage,
    totalCount,
    pageSize,
  });

  if (currentPage === 0) {
    return null;
  }

  const handleClick = (page: number) => {
    if (currentPage === page) {
      return;
    }
    onChange(page);
  };

  const onNext = () => {
    if (currentPage + 1 > paginationRange.length) {
      return;
    }
    handleClick(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage - 1 <= 0) {
      return;
    }
    handleClick(currentPage - 1);
  };

  return (
    <ul className={styles["Pagination"]}>
      <li>
        <button onClick={onNext} className={styles["Pagination-Item"]}>
          <svg
            width="6"
            height="10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.308 9.727c-.36-.352-3.88-4.048-3.88-4.048a.943.943 0 0 1 0-1.359S3.947.62 4.307.272a1.024 1.024 0 0 1 1.392 0 .917.917 0 0 1 0 1.358L2.47 5 5.7 8.368a.919.919 0 0 1 0 1.359 1.023 1.023 0 0 1-1.392 0Z"
              fill="#373737"
            />
          </svg>
        </button>
      </li>
      {paginationRange.map((pageNumber: number | string, index: number) => {
        if (pageNumber === "dots") {
          return (
            <li
              key={index}
              className={clsx(styles["Pagination-Item"], styles["Dots"])}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li key={index}>
            <button
              className={clsx(
                styles["Pagination-Item"],
                currentPage === pageNumber && styles["Pagination-Item_Selected"]
              )}
              onClick={() => handleClick(pageNumber as number)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
      <li>
        <button onClick={onPrevious} className={styles["Pagination-Item"]}>
          <svg
            width="7"
            height="10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.192.273c.36.352 3.88 4.048 3.88 4.048a.943.943 0 0 1 0 1.359s-3.52 3.7-3.88 4.048a1.024 1.024 0 0 1-1.392 0 .917.917 0 0 1 0-1.358L4.03 5 .8 1.632A.919.919 0 0 1 .8.273a1.023 1.023 0 0 1 1.392 0Z"
              fill="#373737"
            />
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
