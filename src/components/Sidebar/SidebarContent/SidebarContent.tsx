import clsx from "clsx";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FC } from "react";

import { getFormatedList } from "helpers/getFormatedList";

import styles from "./SidebarContent.module.css";
import { Category, CategoryAPI } from "types/categoryTypes";

interface SidebarContentProps {
  title: string;
  categories?: CategoryAPI[];
}

const CategoryText = ({
  text,
  count,
  isTitle,
  link,
}: {
  text: string;
  count: number | string;
  isTitle?: boolean;
  link: string;
}) => {
  const { t } = useTranslation();

  if (isTitle) {
    return (
      <h3
        className={clsx(
          styles["SidebarContent-Subtitle"],
          styles["SidebarContent-Text"]
        )}
        title={`${text} (${count})`}
      >
        <Link href="#">
          <a className={styles["SidebarContent-Link"]}>
            <span>{t(text)}</span>
            <span className={styles["SidebarContent-Count"]}>{count}</span>
          </a>
        </Link>
      </h3>
    );
  }

  return (
    <li className={styles["SidebarContent-Text"]} title={`${text} (${count})`}>
      <Link href="#">
        <a className={styles["SidebarContent-Link"]}>
          <span>{t(text)}</span>
          <span className={styles["SidebarContent-Count"]}>{count}</span>
        </a>
      </Link>
    </li>
  );
};

export const SidebarContent: FC<SidebarContentProps> = ({
  title,
  categories,
}) => {
  const { t } = useTranslation();

  const { list, totalCount } = getFormatedList(
    categories,
    "603ce60958c5c6279bc2ed96"
  );

  return (
    <div className={styles["SidebarContent"]}>
      <h2 className={styles["SidebarContent-Title"]}>
        {t(title)}
        <span className={styles["SidebarContent-Count"]}>{totalCount}</span>
      </h2>
      {categories && (
        <ul className={styles["SidebarContent-Hero"]}>
          {list.map(
            ({ title, subCategories, postCount }: Category, index: number) => (
              <li key={index}>
                <CategoryText
                  text={title}
                  count={postCount}
                  link={""}
                  isTitle
                />
                <ul className={styles["SidebarContent-Hero"]}>
                  {subCategories &&
                    subCategories.map(
                      (
                        { title, subCategories, postCount }: Category,
                        index
                      ) => {
                        if (subCategories && subCategories.length) {
                          return (
                            <li key={index}>
                              <CategoryText
                                text={title}
                                count={postCount}
                                isTitle
                                link={""}
                              />
                              <ul className={styles["SidebarContent-Hero"]}>
                                {subCategories.map(
                                  ({ title, postCount }, index) => (
                                    <CategoryText
                                      key={index}
                                      text={title}
                                      count={postCount}
                                      link={""}
                                    />
                                  )
                                )}
                              </ul>
                            </li>
                          );
                        }

                        return (
                          <CategoryText
                            text={title}
                            count={postCount}
                            key={index}
                            link={""}
                          />
                        );
                      }
                    )}
                </ul>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};
