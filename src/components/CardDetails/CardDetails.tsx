import { FC, ReactElement } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import clsx from "clsx";
import Image from "next/image";

import PostCategories from "src/components/PostCategories/PostCategories";
import ActionPostButtons from "src/components/ActionPostButtons/ActionPostButtons";

import { Categories } from "types/postTypes";

import styles from "./CardDetails.module.css";

interface CardDetailsProps {
  children: ReactElement | ReactElement[];
  languages?: {
    language: string;
    _id: string;
  }[];
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
  const { pathname, query } = useRouter();

  return (
    <div className={styles["CardDetails"]}>
      <div className={styles["CardDetails-Wrapper"]}>
        <div className={styles["CardDetails-Header"]}>
          <ActionPostButtons
            postId={postId}
            className={styles["CardDetails-Buttons"]}
            favoriteButton={handleOpen}
          >
            {languages ? (
              languages.map(({ language: languageFromArray, _id }) => (
                <Link
                  key={_id}
                  href={{
                    pathname: `${pathname}`,
                    query: {
                      folder: query.folder,
                      post: [
                        //@ts-ignore
                        query?.post[0],
                        languageFromArray.toLocaleLowerCase(),
                        //@ts-ignore
                        query?.post[2],
                      ],
                    },
                  }}
                >
                  <a
                    className={clsx(
                      styles["CardDetails-LanguageLink"],
                      languageFromArray === language && styles["Active"]
                    )}
                  >
                    {languageFromArray}
                  </a>
                </Link>
              ))
            ) : (
              <Link
                href={{
                  pathname: `${pathname}/[language]`,
                  query: {
                    ...query,
                    language,
                  },
                }}
              >
                <a
                  className={clsx(
                    styles["CardDetails-LanguageLink"],
                    styles["Active"]
                  )}
                >
                  {language}
                </a>
              </Link>
            )}
          </ActionPostButtons>

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
