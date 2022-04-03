import clsx from "clsx";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "../DropDownWithSearch/DropDown";

import { categoriesSvg } from "constant/categoriesSvg";

import styles from "./ActionFilters.module.css";

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

const allOptions = [
  {
    icon: categoriesSvg["DATE"],
    text: "Move",
  },
];

export const ActionFilters = () => {
  return (
    <div className={styles["ActionFilters"]}>
      <div className={styles["ActionFilters-Filters"]}>
        <div
          className={clsx(
            styles["ActionFilters-Item_Filter"],
            styles["ActionFilters-Item"]
          )}
        >
          {/* TODO: set icon */}
          {categoriesSvg["DATE"]}
          <DropDown
            className={styles["ActionFilters-Item_DropDown"]}
            menuClassName={styles["ActionFilters-Item_Menu"]}
            onChange={(value) => {}}
            options={actionOptions}
            renderOptions={({ icon, text }) => (
              <MenuItem
                value={text}
                className={styles["ActionFilters-MenuItem"]}
              >
                <div>{icon}</div>
                <div>{text}</div>
              </MenuItem>
            )}
          />
          <div className={styles["ActionFilters-Arrow"]} />
        </div>

        <div
          className={clsx(
            styles["ActionFilters-Item_Filter"],
            styles["ActionFilters-Item"]
          )}
        >
          {categoriesSvg["DATE"]}
          <DropDown
            className={styles["ActionFilters-Item_DropDown"]}
            menuClassName={styles["ActionFilters-Item_Menu"]}
            onChange={(value) => {}}
            options={languageOptions}
            renderOptions={({ title, text }) => (
              <MenuItem
                value={text}
                className={styles["ActionFilters-MenuItem"]}
              >
                <div>{title}</div>
                <div>{text}</div>
              </MenuItem>
            )}
          />
          <div className={styles["ActionFilters-Arrow"]} />
        </div>

        <div
          className={clsx(
            styles["ActionFilters-Item_Filter"],
            styles["ActionFilters-Item"]
          )}
        >
          {categoriesSvg["DATE"]}
          <DropDown
            className={styles["ActionFilters-Item_DropDown"]}
            menuClassName={styles["ActionFilters-Item_MenuLocation"]}
            onChange={(value) => {}}
            options={locationOptions}
            optionsPropsToFilter={["title", "text"]}
            renderOptions={({ iconFlag, title, text }) => (
              <MenuItem
                value={text}
                className={styles["ActionFilters-MenuItem"]}
              >
                <div>{categoriesSvg["DATE"]}</div>
                <div>{iconFlag}</div>
                <div>{title}</div>
                <div>{text}</div>
              </MenuItem>
            )}
            withSearch
          />
          <div className={styles["ActionFilters-Arrow"]} />
        </div>

        <div
          className={clsx(
            styles["ActionFilters-Item_Filter"],
            styles["ActionFilters-Item"]
          )}
        >
          {/* TODO: set icon */}
          {categoriesSvg["DATE"]}
          <DropDown
            className={styles["ActionFilters-Item_DropDown"]}
            menuClassName={styles["ActionFilters-Item_Menu"]}
            onChange={(value) => {}}
            options={allOptions}
            renderOptions={({ icon, text }) => (
              <MenuItem
                value={text}
                className={styles["ActionFilters-MenuItem"]}
              >
                <div>{icon}</div>
                <div>{text}</div>
              </MenuItem>
            )}
          />
          <div className={styles["ActionFilters-Arrow"]} />
        </div>
      </div>

      <div
        className={clsx(
          styles["ActionFilters-Item_Search"],
          styles["ActionFilters-Item"]
        )}
      ></div>
    </div>
  );
};

export default ActionFilters;
