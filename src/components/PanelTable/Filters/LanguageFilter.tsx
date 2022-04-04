import clsx from "clsx";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { categoriesSvg } from "constant/categoriesSvg";

import styles from "./Filters.module.css";

const languageOptions = [
  {
    title: "TL",
    text: "Text",
  },
  {
    title: "AG",
    text: "Lorem ipsum",
  },
  {
    title: "MX",
    text: "Country",
  },
];

export const LanguageFilter = () => {
  return (
    <div className={styles["Filter"]}>
      {/* TODO: set icon */}
      {categoriesSvg["DATE"]}
      <DropDown
        defaultValue="Language"
        className={styles["Filter_DropDown"]}
        menuClassName={styles["Filter-Menu"]}
        onChange={(value) => {}}
        options={languageOptions}
        renderOptions={({ title, text }) => (
          <MenuItem value={text} className={styles["Filter-MenuItem"]}>
            <div>{title}</div>
            <div>{text}</div>
          </MenuItem>
        )}
      />
      <div className={styles["Filter-Arrow"]} />
    </div>
  );
};
