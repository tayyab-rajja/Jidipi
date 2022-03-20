import { FC } from "react";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import styles from "./CustomButton.module.css";

import { categoriesSvg } from "constant/categoriesSvg";

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  iconType?: string;
  isActive?: boolean;
}

export const CustomButton: FC<CustomButtonProps> = ({
  iconType,
  text,
  isActive,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <button
      className={clsx(styles["CustomButton"], isActive && styles["Active"])}
      onClick={onClick}
    >
      {iconType && categoriesSvg[iconType]}
      <span className={iconType ? styles["CustomButton-TextWithIcon"] : ""}>
        {t(text)}
      </span>
    </button>
  );
};
