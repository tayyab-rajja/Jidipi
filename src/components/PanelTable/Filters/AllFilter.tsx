import { FC } from "react";
import Image from "next/image";
import clsx from "clsx";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { FilterTypes } from "types/filterTypes";
import { actionsSvg } from "constant/actionsSvg";

import menuIcon from "public/images/menuIcon.svg";

import styles from "./Filters.module.css";

const allOptions = [
  {
    icon: actionsSvg["DELETE"],
    text: "Trash",
  },
];

interface AllFilterProps {
  handleFilterChange: (type: FilterTypes, value: string | boolean) => void;
}

export const AllFilter: FC<AllFilterProps> = ({ handleFilterChange }) => {
  return (
    <DropDown
      icon={<Image src={menuIcon} width={15} height={15} alt="Menu" />}
      defaultValue="All"
      className={styles["Filter"]}
      wrapperClassName={styles["FilterWrapper"]}
      onChange={(value) => handleFilterChange("all", value === "All")}
      options={allOptions}
      renderOptions={({ icon, text }, index) => (
        <MenuItem
          key={text + index}
          value={text}
          className={styles["Filter-MenuItem"]}
        >
          <div>{icon}</div>
          <div>{text}</div>
        </MenuItem>
      )}
    />
  );
};
