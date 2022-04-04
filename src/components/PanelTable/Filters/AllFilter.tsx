import clsx from "clsx";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { categoriesSvg } from "constant/categoriesSvg";

import styles from "./Filters.module.css";

const allOptions = [
  {
    icon: categoriesSvg["DATE"],
    text: "Move",
  },
];

export const AllFilter = () => {
  return (
    <div className={styles["Filter"]}>
      {/* TODO: set icon */}
      {categoriesSvg["DATE"]}
      <DropDown
        defaultValue="All"
        className={styles["Filter_DropDown"]}
        menuClassName={styles["Filter-Menu"]}
        onChange={(value) => {}}
        options={allOptions}
        renderOptions={({ icon, text }) => (
          <MenuItem value={text} className={styles["Filter-MenuItem"]}>
            <div>{icon}</div>
            <div>{text}</div>
          </MenuItem>
        )}
      />
      <div className={styles["Filter-Arrow"]} />
    </div>
  );
};
