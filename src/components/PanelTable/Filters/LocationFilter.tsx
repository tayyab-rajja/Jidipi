import clsx from "clsx";
import Image from "next/image";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { categoriesSvg } from "constant/categoriesSvg";
import locationIcon from "public/images/locationIcon.svg";

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
    <DropDown
      icon={<Image src={locationIcon} width={15} height={15} alt="Action" />}
      placeholder="Location"
      className={styles["Filter"]}
      wrapperClassName={styles["FilterWrapper_Location"]}
      onChange={(value) => {}}
      options={locationOptions}
      optionsPropsToFilter={["title", "text"]}
      renderOptions={({ iconFlag, title, text }, index) => (
        <MenuItem
          key={text + index}
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
  );
};
