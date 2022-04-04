import clsx from "clsx";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { categoriesSvg } from "constant/categoriesSvg";

import styles from "./Filters.module.css";

const locationOptions = [
  {
    iconFlag: categoriesSvg["DATE"],
    title: "TL",
    text: "Text",
  },
  {
    iconFlag: categoriesSvg["DATE"],
    title: "AG",
    text: "Lorem ipsum",
  },
  {
    iconFlag: categoriesSvg["DATE"],
    title: "MX",
    text: "Country",
  },
];

export const LocationFilter = () => {
  return (
    <div className={clsx(styles["Filter"], styles["Filter-Location"])}>
      {/* TODO: set icon */}
      {categoriesSvg["DATE"]}
      <DropDown
        defaultValue="Location"
        className={styles["Filter_DropDown"]}
        menuClassName={clsx(
          styles["Filter-Menu"],
          styles["Filter-Menu_Location"]
        )}
        onChange={(value) => {}}
        options={locationOptions}
        optionsPropsToFilter={["title", "text"]}
        renderOptions={({ iconFlag, title, text }) => (
          <MenuItem
            value={text}
            className={clsx(
              styles["Filter-MenuItem"],
              styles["Filter-MenuItem_Location"]
            )}
          >
            <div>{categoriesSvg["DATE"]}</div>
            <div>{iconFlag}</div>
            <div>{title}</div>
            <div>{text}</div>
          </MenuItem>
        )}
        withSearch
      />
      <div className={styles["Filter-Arrow"]} />
    </div>
  );
};
