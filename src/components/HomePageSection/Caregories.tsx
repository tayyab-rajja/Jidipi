import Link from "next/link";
import { FC } from "react";

import { useCategories } from "../Categories/useCategories";

import styles from "./HomePageSection.module.css";

interface CaregoriesProps {
  pageFolderId: string;
  pageName: string;
  backgroundImage?: string;
}

export const Caregories: FC<CaregoriesProps> = ({
  pageFolderId,
  pageName,
  backgroundImage = "http://jidipi.com/wp-content/uploads/2022/01/home-bk-architecture.jpg",
}) => {
  const { categories: allCategories } = useCategories(pageFolderId);

  const categories =
    allCategories?.categories.find(({ type }) => type === "CATEGORIES")
      ?.categories || [];

  return (
    <section
      className={styles["Caregories"]}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles["Caregories-Img"]}></div>
      <ul className={styles["Caregories-Content"]}>
        {categories.map(({ subCategories }) =>
          subCategories.map(({ title, uniqueId, subCategories }) => [
            <li key={uniqueId}>
              <Link href={`/${pageName}/categories/${uniqueId}`}>
                <a className={styles["Caregories-ItemLink"]}>{title}</a>
              </Link>
            </li>,
            ...subCategories.map(({ title, uniqueId }) => (
              <li key={uniqueId + title}>
                <Link href={`/${pageName}/categories/${uniqueId}`}>
                  <a className={styles["Caregories-ItemLink"]}>{title}</a>
                </Link>
              </li>
            )),
          ])
        )}
      </ul>
    </section>
  );
};
