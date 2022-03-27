import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { FC } from "react";

import styles from "./SidebarContent.module.css";

interface SidebarContentPriops {
  title: string;
  categories?: [];
}

interface Categories {
  categoryId: {
    title: string;
  };
  subCategories: [];
}

const CategoryText = ({
  text,
  count,
  isTitle,
}: {
  text: string;
  count: number | string;
  isTitle?: boolean;
}) => {
  const { t } = useTranslation();

  if (isTitle) {
    return (
      <h3
        className={clsx(
          styles["SidebarContent-Subtitle"],
          styles["SidebarContent-Text"]
        )}
      >
        <span>
          {t(text)}
          <span className={styles["SidebarContent-Count"]}>{count}</span>
        </span>
      </h3>
    );
  }

  return (
    <li className={styles["SidebarContent-Text"]}>
      <span>
        {t(text)}
        <span className={styles["SidebarContent-Count"]}>{count}</span>
      </span>
    </li>
  );
};

export const SidebarContent: FC<SidebarContentPriops> = ({
  title,
  categories,
}) => {
  const { t } = useTranslation();

  console.log(categories);

  return (
    <div className={styles["SidebarContent"]}>
      <h2 className={styles["SidebarContent-Title"]}>
        {t(title)}
        <span className={styles["SidebarContent-Count"]}></span>
      </h2>
      {categories && (
        <ul className={styles["SidebarContent-Hero"]}>
          {categories.map(
            ({ categoryId, subCategories }: Categories, index) => {
              const title = categoryId.title;
              return (
                <li key={index}>
                  <CategoryText text={title} count={100} isTitle />
                  <ul className={styles["SidebarContent-Hero"]}>
                    {subCategories.map(
                      ({ categoryId, subCategories }: Categories, index) => {
                        const title = categoryId.title;

                        if (!subCategories.length) {
                          return (
                            <CategoryText
                              text={title}
                              count={100}
                              key={index}
                            />
                          );
                        }

                        return (
                          <li key={index}>
                            <CategoryText text={title} count={1000} isTitle />
                            <ul className={styles["SidebarContent-Hero"]}>
                              {subCategories.map(({ title }, index) => (
                                <CategoryText
                                  key={index}
                                  text={title}
                                  count={100}
                                />
                              ))}
                            </ul>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </li>
              );
            }
          )}
        </ul>
      )}
    </div>
  );
};
