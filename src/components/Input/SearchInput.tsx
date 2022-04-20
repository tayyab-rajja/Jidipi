import { FC, KeyboardEventHandler, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import CreatableSelect from "react-select/creatable";
import { OnChangeValue } from "react-select";

import searchIcon from "public/images/searchIcon.svg";

import styles from "./SearchInput.module.css";
import { SearchInputOption, SearchInputValue } from "types/searcInputTypes";

const components = {
  DropdownIndicator: null,
};

interface SearchInputProps {
  className?: string;
  value: SearchInputValue;
  onChange: (value: SearchInputValue) => void;
}

export const createOption = (label: string) => ({
  label,
  value: label,
});

export const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  className,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (!value.some(({ value }) => value === inputValue)) {
          onChange([...value, createOption(inputValue)]);
        }
        setInputValue("");
        event.preventDefault();
    }
  };

  const handleChange = (value: OnChangeValue<SearchInputOption, true>) => {
    onChange(value);
  };

  const handleBlur = () => {
    const isValueExisting = value.some(({ value }) => value === inputValue);

    if (!isValueExisting && inputValue) {
      onChange([...value, createOption(inputValue)]);
      setInputValue("");
    }
  };

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  return (
    <div className={clsx(styles["Input"], className)}>
      <Image src={searchIcon} width={15} height={15} alt="Search" />
      <CreatableSelect
        id="selectbox"
        instanceId="selectbox"
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        components={components}
        placeholder="Search"
      />
    </div>
  );
};
