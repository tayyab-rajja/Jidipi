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

  return (
    <ul className={styles["Post-Info"]}>
      {categories.map(({ type, title }, index) => (
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
      ))}
    </ul>
  );
};

export default PostCategories;
