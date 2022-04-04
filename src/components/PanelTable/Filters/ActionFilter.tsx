import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { categoriesSvg } from "constant/categoriesSvg";

import styles from "./Filters.module.css";

const actionOptions = [
  {
    icon: categoriesSvg["DATE"],
    text: "Move",
  },
  {
    icon: categoriesSvg["DATE"],
    text: "Copy",
  },
  {
    icon: categoriesSvg["DATE"],
    text: "Delete",
  },
];

export const ActionFilter = () => {
  return (
    <div className={styles["Filter"]}>
      {/* TODO: set icon */}
      {categoriesSvg["DATE"]}
      <DropDown
        defaultValue="Action"
        className={styles["Filter_DropDown"]}
        menuClassName={styles["Filter-Menu"]}
        onChange={(value) => {}}
        options={actionOptions}
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
