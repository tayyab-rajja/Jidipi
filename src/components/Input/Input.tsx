import { KeyboardEventHandler, useState } from "react";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";

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
      // classNamePrefix="input"
      {...props}
    />
  );
};
