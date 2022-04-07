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
    <DropDown
      placeholder="Action"
      icon={<Image src={actionIcon} width={15} height={15} alt="Action" />}
      className={styles["Filter"]}
      wrapperClassName={styles["FilterWrapper"]}
      options={actionOptions}
      onChange={(value) => {}}
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
