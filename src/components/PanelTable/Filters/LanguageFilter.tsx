import { FC } from "react";
import Image from "next/image";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import flagIcon from "public/images/flagIcon.svg";
import { FilterTypes } from "types/filterTypes";

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

interface LanguageFilterProps {
  handleFilterChange: (type: FilterTypes, value: string | boolean) => void;
}

export const LanguageFilter: FC<LanguageFilterProps> = ({
  handleFilterChange,
}) => {
  return (
    <DropDown
      placeholder="Language"
      defaultValue={""}
      icon={<Image src={flagIcon} width={15} height={15} alt="Flag" />}
      className={styles["Filter"]}
      wrapperClassName={styles["FilterWrapper"]}
      onChange={(value) => handleFilterChange("filter", value)}
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
