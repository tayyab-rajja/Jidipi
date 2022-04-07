import clsx from "clsx";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { categoriesSvg } from "constant/categoriesSvg";
import menuIcon from "public/images/menuIcon.svg";

import styles from "./Filters.module.css";
import Image from "next/image";

const allOptions = [
  {
    icon: categoriesSvg["DATE"],
    text: "Move",
  },
];

export const AllFilter = () => {
  return (
    <DropDown
      icon={<Image src={menuIcon} width={15} height={15} alt="Menu" />}
      placeholder="All"
      className={styles["Filter"]}
      wrapperClassName={styles["FilterWrapper"]}
      onChange={(value) => {}}
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
