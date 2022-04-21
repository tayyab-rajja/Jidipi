import { FC, useEffect } from "react";
import clsx from "clsx";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { FilterTypes } from "types/filterTypes";

import styles from "./Filters.module.css";

const postsPerPageOptions = [
  {
    count: 20,
  },
  {
    count: 100,
  },
];

interface PostsPerPageProps {
  handleFilterChange: (
    type: FilterTypes,
    value: string | boolean | number
  ) => void;
}

export const PostsPerPage: FC<PostsPerPageProps> = ({ handleFilterChange }) => {
  const defaultValue = 20;

  useEffect(() => {
    handleFilterChange("postsPerPage", defaultValue);
  }, []);

  return (
    <div className={styles["PostsPerPage"]}>
      <div className={styles["PostsPerPage-Title"]}>
        <span>Posts per Page</span>
      </div>
      <DropDown
        defaultValue={defaultValue}
        className={styles["PostsPerPage-Filter"]}
        onChange={(value) => handleFilterChange("postsPerPage", value)}
        options={postsPerPageOptions}
        renderOptions={({ count }, index, selectedItem) => (
          <MenuItem
            key={count + index}
            value={count}
            className={clsx(
              styles["PostsPerPage-Filter_MenuItem"],
              selectedItem === count &&
                styles["PostsPerPage-Filter_Selected-MenuItem"]
            )}
          >
            {count}
          </MenuItem>
        )}
      />
    </div>
  );
};
