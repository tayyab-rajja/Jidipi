import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { categoriesSvg } from "constant/categoriesSvg";
import { Categories } from "types/postTypes";

import styles from "./PostCategories.module.css";

interface PostCategoriesProps {
  categories: Categories[];
}

const PostCategories: FC<PostCategoriesProps> = ({ categories }) => {
  const { t } = useTranslation();

  const sortedCategories: Array<{ type: string; titles: string }> = [];

  categories.map(({ type, title }) => {
    const desiredObject = sortedCategories.find((obj) => obj.type === type);

    if (desiredObject) {
      desiredObject.titles = `${desiredObject.titles}, ${title}`;
    } else {
      if (type === "DATE") {
        title = title.replace(/.*\D\s\d\d/, "$&,");
      }

      sortedCategories.push({
        type,
        titles: title,
      });
    }
  });

  return (
    <ul className={styles["Post-Info"]}>
      {/* Изначальный код Дани */}

      {/* {categories.map(({ type, title }, index) => (
        <li
          key={index}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Link href="#">
            <a className={styles["Post-InfoText"]}>
              {categoriesSvg[type]}
              <span>{t(title)}</span>
            </a>
          </Link>
        </li>
      ))} */}

      {sortedCategories.map(({ type, titles }, index) => (
        <li
          key={index}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Link href="#">
            <a className={styles["Post-InfoText"]}>
              {categoriesSvg[type]}
              <span>{t(titles)}</span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostCategories;
