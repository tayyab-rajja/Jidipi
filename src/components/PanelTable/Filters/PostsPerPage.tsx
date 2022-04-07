import clsx from "clsx";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import styles from "./Filters.module.css";

const postsPerPageOptions = [
  {
    count: 20,
  },
  {
    count: 100,
  },
];

export const PostsPerPage = () => {
  return (
    <div className={styles["PostsPerPage"]}>
      <div className={styles["PostsPerPage-Title"]}>
        <span>Posts per Page</span>
      </div>
      <DropDown
        defaultValue={20}
        className={styles["PostsPerPage-Filter"]}
        onChange={(value) => {}}
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
