import clsx from "clsx";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { categoriesSvg } from "constant/categoriesSvg";
import menuIcon from "public/images/menuIcon.svg";

import styles from "./Filters.module.css";
import Image from "next/image";

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
      <div className={styles["PostsPerPage-Filter"]}>
        <DropDown
          defaultValue="20"
          className={styles["PostsPerPage-Filter_DropDown"]}
          menuClassName={styles["PostsPerPage-Filter_Menu"]}
          onChange={(value) => {}}
          options={postsPerPageOptions}
          renderOptions={({ count }) => (
            <MenuItem
              value={count}
              className={styles["PostsPerPage-Filter_MenuItem"]}
            >
              {count}
            </MenuItem>
          )}
        />
        <div className={styles["Filter-Arrow"]} />
      </div>
    </div>
  );
};
