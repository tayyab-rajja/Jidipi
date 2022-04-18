import { FC } from "react";
import Image from "next/image";
import { MenuItem } from "@szhsin/react-menu";

import { DropDown } from "src/components/DropDown/DropDown";

import { actionsSvg } from "constant/actionsSvg";
import actionIcon from "public/images/actionIcon.svg";

import styles from "./Filters.module.css";

const actionOptions = [
  {
    icon: actionsSvg["MOVE"],
    text: "Move",
    value: "move",
  },
  {
    icon: actionsSvg["COPY"],
    text: "Copy",
    value: "copy",
  },
  {
    icon: actionsSvg["DELETE"],
    text: "Delete",
    value: "delete",
  },
];

interface ActionFilterProps {
  handleAction: (type: string) => void;
}

export const ActionFilter: FC<ActionFilterProps> = ({ handleAction }) => {
  return (
    <DropDown
      placeholder="Action"
      icon={<Image src={actionIcon} width={15} height={15} alt="Action" />}
      className={styles["Filter"]}
      wrapperClassName={styles["FilterWrapper"]}
      options={actionOptions}
      isShouldViewValue={false}
      onChange={(value) => handleAction(value)}
      renderOptions={({ icon, text, value }, index) => (
        <MenuItem
          key={text + index}
          value={value}
          className={styles["Filter-MenuItem"]}
        >
          <div>{icon}</div>
          <div>{text}</div>
        </MenuItem>
      )}
    />
  );
};
