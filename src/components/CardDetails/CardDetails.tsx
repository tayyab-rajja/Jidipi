import { FC, ReactElement, useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import PostCategories from "src/components/PostCategories/PostCategories";
import ActionPostButtons from "src/components/ActionPostButtons/ActionPostButtons";

import { Categories } from "types/postTypes";

import styles from "./CardDetails.module.css";

interface CardDetailsProps {
  children: ReactElement | ReactElement[];
  languages: [] | undefined;
  language: string;
  categories: Categories[];
  title: string;
  companyImg?: string;
  handleOpen: () => void;
  postId: string;
}

const CardDetails: FC<CardDetailsProps> = ({
  children,
  categories,
  language,
  languages,
  title,
  companyImg,
  handleOpen,
  postId,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles["CardDetails"]}>
      <div className={styles["CardDetails-Wrapper"]}>
        <div className={styles["CardDetails-Header"]}>
          <ActionPostButtons
            language={language}
            postId={postId}
            languages={languages}
            className={styles["CardDetails-Buttons"]}
            favoriteButton={handleOpen}
          />
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
