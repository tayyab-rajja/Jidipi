import Image from "next/image";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { categoriesSvg } from "constant/categoriesSvg";
import actionIcon from "public/images/actionIcon.svg";

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
      <Image src={actionIcon} width={15} height={15} alt="Action" />
      <DropDown
        defaultValue="Action"
        className={styles["Filter_DropDown"]}
        menuClassName={styles["Filter-Menu"]}
        onChange={(value) => {}}
        options={actionOptions}
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
      <div className={styles["Filter-Arrow"]} />
    </div>
  );
};
