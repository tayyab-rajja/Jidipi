import { FC, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import clsx from "clsx";

import PostCategories from "src/components/PostCategories/PostCategories";

import { Categories } from "types/postTypes";

import styles from "./CardDetails.module.css";

interface CardDetailsProps {
  children: ReactElement;
  categories: Categories[];
  title: string;
  companyImg?: string;
}

const CardDetails: FC<CardDetailsProps> = ({
  children,
  categories,
  title,
  companyImg,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles["CardDetails"]}>
      <div className={styles["CardDetails-Wrapper"]}>
        <div className={styles["CardDetails-Header"]}>
          <div className={styles["CardDetails-Buttons"]}>
            <button
              className={clsx(styles["CardDetails-Button"], styles["Active"])}
            >
              EN
            </button>
            <button className={clsx(styles["CardDetails-Button"])}>EN</button>
            <button className={clsx(styles["CardDetails-Button"])}>EN</button>
            <button className={clsx(styles["CardDetails-Button"])}>EN</button>
          </div>
          <div className={styles["CardDetails-TitleWrapper"]}>
            {companyImg && (
              <div className={styles["CardDetails-CompanyLogo"]}>
                <Image
                  src={companyImg}
                  width={105}
                  height={105}
                  alt="Company"
                />
              </div>
            )}
            <h1 className={styles["CardDetails-Title"]}>{t(title)}</h1>
          </div>
          <PostCategories categories={categories} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default CardDetails;
