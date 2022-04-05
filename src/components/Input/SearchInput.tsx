import { FC, KeyboardEventHandler, useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import CreatableSelect from "react-select/creatable";
import { OnChangeValue } from "react-select";

import searchIcon from "public/images/searchIcon.svg";

import { categoriesSvg } from "constant/categoriesSvg";

import styles from "./SearchInput.module.css";

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

type Value = readonly Option[] | [];

interface SearchInputProps {
  onChange: (value: Value) => void;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

export const SearchInput: FC<SearchInputProps> = ({ onChange }) => {
  const [value, setValue] = useState<Value>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        !value.some(({ value }) => value === inputValue) &&
          setValue([...value, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  const handleChange = (value: OnChangeValue<Option, true>) => {
    setValue(value);
  };

  const handleBlur = () => {
    const isValueExisting = value.some(({ value }) => value === inputValue);

    if (!isValueExisting && inputValue) {
      setValue([...value, createOption(inputValue)]);
      setInputValue("");
    }
  };

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <div className={clsx(styles["Input"])}>
      <Image src={searchIcon} width={15} height={15} alt="Search" />
      <CreatableSelect
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
      />
    </div>
  );
};
