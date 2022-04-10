import Image from "next/image";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import categoryIcon from "public/images/categoryIcon.svg";

import styles from "./Filters.module.css";
import clsx from "clsx";

const categoryOptions = [
  {
    text: "Interview",
  },
  {
    text: "Talk",
  },
  {
    text: "Event",
  },
];

export const CategoryFilter = () => {
  return (
    <DropDown
      placeholder="Category"
      icon={<Image src={categoryIcon} width={15} height={15} alt="Group" />}
      className={styles["Filter"]}
      wrapperClassName={styles["FilterWrapper"]}
      options={categoryOptions}
      onChange={(value) => {}}
      renderOptions={({ text }, index, selectedItem) => (
        <MenuItem
          key={text + index}
          value={text}
          className={clsx(
            styles["Filter-MenuItem"],
            text === selectedItem && styles["Filter-MenuItem_Selected"]
          )}
        >
          {text}
        </MenuItem>
      )}
    />
  );
};
