import { FC } from "react";
import clsx from "clsx";
import Image from "next/image";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import categoryIcon from "public/images/categoryIcon.svg";
import { FilterTypes } from "types/filterTypes";

import styles from "./Filters.module.css";

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

interface CategoryFilterProps {
  handleFilterChange: (type: FilterTypes, value: string | boolean) => void;
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
  handleFilterChange,
}) => {
  return (
    <DropDown
      placeholder="Category"
      icon={<Image src={categoryIcon} width={15} height={15} alt="Group" />}
      className={styles["Filter"]}
      defaultValue=""
      wrapperClassName={styles["FilterWrapper"]}
      options={categoryOptions}
      onChange={(value) => handleFilterChange("filter", value)}
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
