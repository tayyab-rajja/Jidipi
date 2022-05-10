import { FC } from "react";
import { ICategory, ISubCategory } from "types/categoryTypes";

import styles from "./Categories.module.css";

interface Props {
  categories: ICategory[];
}

const getAllSubCategories = (subCategories: ISubCategory[]) => {
  const allSubCategories: ISubCategory[] = [];

  subCategories.map((item) => {
    allSubCategories.push(item);

    if (item.subCategories?.length) {
      allSubCategories.push(...getAllSubCategories(item.subCategories));
    }
  });

  return allSubCategories;
};

const CategoryItem = ({ category }: { category: ICategory }) => {
  return (
    <li key={category.uniqueId} className={styles["CategoryCard-Text"]}>
      {category.title} ({category.count})
    </li>
  );
};

export const Categories: FC<Props> = ({ categories }) => {
  return (
    <ul className={styles["Category-Container"]}>
      {categories?.map((category: ICategory) => [
        <CategoryItem key={category.uniqueId} category={category} />,
        getAllSubCategories(category.subCategories).map((subCategory) => (
          <CategoryItem key={subCategory.uniqueId} category={subCategory} />
        )),
      ])}
    </ul>
  );
};
