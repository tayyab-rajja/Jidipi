import clsx from "clsx";
import Image from "next/image";
import { FC, ReactElement, useRef, useState } from "react";
import { FocusableItem, ControlledMenu } from "@szhsin/react-menu";

import searchIcon from "public/images/searchIcon.svg";

import styles from "./DropDown.module.css";
import "@szhsin/react-menu/dist/index.css";

interface DropDownProps {
  icon?: ReactElement;
  className?: string;
  wrapperClassName?: string;
  menuClassName?: string;
  placeholder?: string;
  defaultValue?: any;
  options: { [key: string]: any }[];
  renderOptions: (
    agr: any,
    index?: number,
    selectedItem?: string
  ) => ReactElement;
  onChange: (value: any) => void;
  withSearch?: boolean;
  optionsPropsToFilter?: string[];
}

export const DropDown: FC<DropDownProps> = ({
  menuClassName,
  icon,
  className,
  options,
  placeholder,
  defaultValue = null,
  wrapperClassName,
  onChange,
  renderOptions,
  optionsPropsToFilter,
  withSearch = false,
}) => {
  const [filter, setFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(defaultValue);
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div
      onMouseLeave={() => setOpen(false)}
      className={clsx(styles["DropDown"], wrapperClassName)}
    >
      <div
        ref={ref}
        className={clsx(styles["Filter"], className)}
        onClick={() => setOpen(!isOpen)}
      >
        {icon}
        {selectedItem ? selectedItem : placeholder}
        <div className={styles["Filter-Arrow"]} />
      </div>

      <ControlledMenu
        state={isOpen ? "open" : "closed"}
        menuClassName={clsx(styles["Menu"], menuClassName)}
        anchorRef={ref}
        direction="bottom"
        onItemClick={({ value }) => {
          if (value === selectedItem) {
            setSelectedItem(defaultValue);
            onChange(defaultValue);
          } else {
            setSelectedItem(value);
            onChange(value);
          }
          setOpen(false);
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
          .map((arg, index) => renderOptions(arg, index, selectedItem))}
      </ControlledMenu>
    </div>
  );
};
