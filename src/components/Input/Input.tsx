import clsx from "clsx";
import { categoriesSvg } from "constant/categoriesSvg";
import { KeyboardEventHandler, useState } from "react";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";

import styles from "./Input.module.css";

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

export const Input = (props) => {
  const [value, setValue] = useState<readonly Option[] | []>([]);
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

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  return (
    <div className={clsx(styles["Input"])}>
      {categoriesSvg["DATE"]}
      <CreatableSelect
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        value={value}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        components={components}
        {...props}
      />
    </div>
  );
};
