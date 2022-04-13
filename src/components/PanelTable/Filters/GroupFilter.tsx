import { FC } from "react";
import clsx from "clsx";
import Image from "next/image";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import groupIcon from "public/images/groupIcon.svg";

import { FilterTypes } from "types/filterTypes";

import styles from "./Filters.module.css";

const groupOptions = [
  {
    text: "Architect",
  },
  {
    text: "Decorator",
  },
  {
    text: "Designer",
  },
  {
    text: "Planner",
  },
  {
    text: "Engineer",
  },
  {
    text: "Contractor",
  },
  {
    text: "Manufacturer",
  },
  {
    text: "Retailers",
  },
  {
    text: "Photographer",
  },
];

interface GroupFilterProps {
  handleFilterChange: (type: FilterTypes, value: string | boolean) => void;
}

export const GroupFilter: FC<GroupFilterProps> = ({ handleFilterChange }) => {
  return (
    <DropDown
      placeholder="Group"
      icon={<Image src={groupIcon} width={15} height={15} alt="Group" />}
      className={styles["Filter"]}
      defaultValue=""
      wrapperClassName={styles["FilterWrapper"]}
      options={groupOptions}
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
