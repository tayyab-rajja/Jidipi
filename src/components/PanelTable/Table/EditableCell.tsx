import { ChangeEvent, useEffect, useState } from "react";
import { CustomCheckbox } from "@reach/checkbox";
import { Row, CellValue, ColumnGroup } from "react-table";

import { UpdateMyData } from "types/updateMyData";

import styles from "./Table.module.css";
import { actionsSvg } from "constant/actionsSvg";

interface EditableCellProps {
  row: Row;
  value: CellValue;
  column: ColumnGroup;
  updateMyData: UpdateMyData;
  isDataTrashed: boolean;
}

export const EditableCell = ({
  value: initialValue,
  row: { values, index },
  column: { id },
  updateMyData,
  isDataTrashed,
}: EditableCellProps) => {
  const [value, setValue] = useState(initialValue);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onCheckboxCahnge = (e: ChangeEvent<HTMLInputElement>) => {
    updateMyData(e.target.checked, index, id);
    setValue(e.target.checked);
  };

  const onBlur = () => {
    updateMyData(value, index, id);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  switch (id) {
    case "edit":
      if (isDataTrashed) {
        return (
          <div className={styles["Table-Column_Edit"]}>
            <button></button>
            <button></button>
          </div>
        );
      }
      return (
        <div className={styles["Table-Column_Edit"]}>
          <button>{actionsSvg["MOVE"]}</button>
          <button>{actionsSvg["COPY"]}</button>
          <button>{actionsSvg["DELETE"]}</button>
        </div>
      );
    case "label":
    case "note":
      return (
        <input
          value={value}
          onChange={onInputChange}
          onBlur={onBlur}
          className={styles["Table-Input_Text"]}
        />
      );
    case "isSelect":
      return (
        <CustomCheckbox
          checked={value}
          defaultChecked={value}
          onChange={onCheckboxCahnge}
          className={styles["Table-Input_Select"]}
        />
      );

    default:
      return value;
  }
};
