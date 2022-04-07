import clsx from "clsx";
import Image from "next/image";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { categoriesSvg } from "constant/categoriesSvg";
import flagIcon from "public/images/flagIcon.svg";

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
    <DropDown
      placeholder="Language"
      icon={<Image src={flagIcon} width={15} height={15} alt="Flag" />}
      className={styles["Filter"]}
      wrapperClassName={styles["FilterWrapper"]}
      onChange={(value) => {}}
      options={languageOptions}
      renderOptions={({ title, text }, index) => (
        <MenuItem
          key={text + index}
          value={text}
          className={styles["Filter-MenuItem"]}
        >
          <div>{title}</div>
          <div>{text}</div>
        </MenuItem>
      )}
    />
  );
};
