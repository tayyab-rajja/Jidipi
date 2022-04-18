import Image from "next/image";
import clsx from "clsx";
import { FC } from "react";

import { usePagination } from "./usePagination";

import arrowLeft from "public/images/arrowLeft.svg";
import arrowRight from "public/images/arrowRight.svg";

import styles from "./Pagination.module.css";

interface PaginationProps {
  onChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  reverse?: boolean;
  pageSize: number;
  currentPage: number;
  className?: string;
  arrowHeight?: number | string;
  arrowWidth?: number | string;
}

const Pagination: FC<PaginationProps> = ({
  onChange,
  totalCount,
  reverse,
  siblingCount = 1,
  pageSize,
  currentPage,
  className,
  arrowHeight = 10,
  arrowWidth = 6,
}) => {
  const page = currentPage + 1;

  const paginationRange = usePagination({
    siblingCount,
    currentPage,
    reverse,
    totalCount,
    pageSize,
  });

  if (page === 0) {
    return null;
  }

  const handleClick = (newPage: number) => {
    if (currentPage === newPage) {
      return;
    }
    onChange(newPage);
  };

  const onNext = () => {
    if (page + 1 > paginationRange.length) {
      return;
    }
    handleClick(currentPage + 1);
  };

  const onPrevious = () => {
    if (page - 1 <= 0) {
      return;
    }
    handleClick(currentPage - 1);
  };

  return (
    <ul className={styles["Pagination"]}>
      <li>
        <button
          onClick={() => {
            if (reverse) {
              onNext();
              return;
            }
            onPrevious();
          }}
          className={clsx(styles["Pagination-Item"], className)}
        >
          <Image
            src={arrowLeft}
            height={arrowHeight}
            width={arrowWidth}
            alt="arrow"
          />
        </button>
      </li>
      {paginationRange.map((pageNumber: number | string, index: number) => {
        if (pageNumber === "dots") {
          return (
            <li key={index} className={clsx(styles["Dots"], className)}>
              &#8230;
            </li>
          );
        }

        return (
          <li key={index}>
            <button
              className={clsx(
                styles["Pagination-Item"],
                className,
                page === pageNumber && styles["Pagination-Item_Selected"]
              )}
              onClick={() => handleClick(+pageNumber - 1)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
      <li>
        <button
          onClick={() => {
            if (reverse) {
              onPrevious();
              return;
            }
            onNext();
          }}
          className={clsx(styles["Pagination-Item"], className)}
        >
          <Image
            src={arrowRight}
            height={arrowHeight}
            width={arrowWidth}
            alt="arrow"
          />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
