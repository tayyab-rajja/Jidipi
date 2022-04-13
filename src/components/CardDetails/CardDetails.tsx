import { useRouter } from "next/router";
import { FC, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import clsx from "clsx";

import PostCategories from "src/components/PostCategories/PostCategories";

import { Categories } from "types/postTypes";
import { postsActionSvG } from "constant/postsActionSvG";

import styles from "./CardDetails.module.css";

interface CardDetailsProps {
  children: ReactElement | ReactElement[];
  languages: [] | undefined;
  language: string;
  categories: Categories[];
  title: string;
  companyImg?: string;
  postId: string;
}

const CardDetails: FC<CardDetailsProps> = ({
  children,
  categories,
  language,
  languages,
  title,
  companyImg,
  postId,
}) => {
  const {
    query: { post },
  } = useRouter();
  const { t } = useTranslation();

  return (
    <div className={styles["CardDetails"]}>
      <div className={styles["CardDetails-Wrapper"]}>
        <div className={styles["CardDetails-Header"]}>
          <div className={styles["CardDetails-Buttons"]}>
            {languages ? (
              languages.map(({ language: languageFromArray, _id }) => (
                <button
                  key={_id}
                  className={clsx(
                    styles["CardDetails-Button"],
                    languageFromArray === language && styles["Active"]
                  )}
                >
                  {t(languageFromArray)}
                </button>
              ))
            ) : (
              <button
                className={clsx(styles["CardDetails-Button"], styles["Active"])}
              >
                {t(language)}
              </button>
            )}
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}/gallery/download`}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(styles["CardDetails-Button"])}
            >
              {postsActionSvG["DOWNLOAD"]}
            </a>
            <button className={clsx(styles["CardDetails-Button"])}>
              {postsActionSvG["SHARE"]}
            </button>
            <button className={clsx(styles["CardDetails-Button"])}>
              {postsActionSvG["FAVORITE"]}
            </button>
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
