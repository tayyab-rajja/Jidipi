import clsx from "clsx";
import Image from "next/image";
import { FC, ReactElement, useState } from "react";
import { Menu, FocusableItem, MenuButton } from "@szhsin/react-menu";

import searchIcon from "public/images/searchIcon.svg";

import styles from "./DropDown.module.css";
import "@szhsin/react-menu/dist/index.css";

interface DropDownProps {
  className?: string;
  menuClassName?: string;
  defaultValue: string;
  options: { [key: string]: any }[];
  renderOptions: (agr: any) => ReactElement;
  onChange: (value: any) => void;
  withSearch?: boolean;
  optionsPropsToFilter?: string[];
}

export const DropDown: FC<DropDownProps> = ({
  menuClassName,
  className,
  options,
  defaultValue,
  onChange,
  renderOptions,
  optionsPropsToFilter,
  withSearch = false,
}) => {
  const [filter, setFilter] = useState("");
  const [selectItem, setSelectItem] = useState(defaultValue);

  return (
    <Menu
      menuClassName={clsx(styles["Menu"], menuClassName)}
      menuButton={<MenuButton className={className}>{selectItem}</MenuButton>}
      direction="bottom"
      onItemClick={({ value }) => {
        if (value === selectItem) {
          setSelectItem(defaultValue);
          onChange("");
          return;
        }
        setSelectItem(value);
        onChange(value);
      }}
      onMenuChange={(e) => {
        e.open && setFilter("");
      }}
    >
      {withSearch && (
        <FocusableItem className={styles["Menu-Item"]}>
          {({ ref }) => (
            <div className={styles["Menu-InputContainer"]}>
              <div className={styles["Menu-InputSearchIcon"]}>
                <Image src={searchIcon} width={15} height={15} alt="Search" />
              </div>
              <input
                ref={ref}
                className={styles["Menu-Input"]}
                type="text"
                placeholder="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value.trim())}
              />
            </div>
          )}
        </FocusableItem>
      )}
      {options
        .filter((option) => {
          if (!optionsPropsToFilter) {
            return true;
          }
          return optionsPropsToFilter.some((name) => {
            return option[name]
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase());
          });
        })
        .map(renderOptions)}
    </Menu>
  );
};
