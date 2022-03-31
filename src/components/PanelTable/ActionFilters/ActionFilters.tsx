import { Listbox, ListboxOption } from "@reach/listbox";

import styles from "./ActionFilters.module.css";
import "@reach/listbox/styles.css";
import { categoriesSvg } from "constant/categoriesSvg";
import clsx from "clsx";

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
          <Listbox arrow={<div className={styles["ActionFilters-Arrow"]} />}>
            <ListboxOption value="action">Action</ListboxOption>
          </Listbox>
        </div>

        <div
          className={clsx(
            styles["ActionFilters-Item_Filter"],
            styles["ActionFilters-Item"]
          )}
        >
          {/* TODO: set icon */}
          {categoriesSvg["DATE"]}
          <Listbox arrow={<div className={styles["ActionFilters-Arrow"]} />}>
            <ListboxOption value="value">
              <span>11111111111111</span>
            </ListboxOption>
          </Listbox>
        </div>

        <div
          className={clsx(
            styles["ActionFilters-Item_Filter"],
            styles["ActionFilters-Item"]
          )}
        >
          {/* TODO: set icon */}
          {categoriesSvg["DATE"]}
          <Listbox arrow={<div className={styles["ActionFilters-Arrow"]} />}>
            <ListboxOption value="value">
              <span>11111111111111</span>
            </ListboxOption>
          </Listbox>
        </div>

        <div
          className={clsx(
            styles["ActionFilters-Item_Filter"],
            styles["ActionFilters-Item"]
          )}
        >
          {/* TODO: set icon */}
          {categoriesSvg["DATE"]}
          <Listbox arrow={<div className={styles["ActionFilters-Arrow"]} />}>
            <ListboxOption value="value">
              <span>11111111111111</span>
            </ListboxOption>
          </Listbox>
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
