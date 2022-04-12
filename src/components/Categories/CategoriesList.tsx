import Link from "next/link";
import { ICategory, ICategoryTab, ISubCategory } from "types/categoryTypes";

import clsx from "clsx";
import styles from "./Categories.module.css";

const List: React.FC = ({ children }) => {
  return <ul className={styles["CategoriesList-List"]}>{children}</ul>;
};

const Item: React.FC<{
  data: ICategory | ISubCategory;
  hasNestedList?: boolean;
}> = ({ data, hasNestedList, children }) => {
  return (
    <li>
      <Link href="#">
        <a
          className={clsx(
            styles["CategoriesList-ItemLink"],
            hasNestedList && styles["CategoriesList-ItemLink_heading"]
          )}
        >
          {data.title} <span>{data.count}</span>
        </a>
      </Link>
      {children}
    </li>
  );
};

export const CategoriesList = ({ category }: { category: ICategoryTab }) => {
  return (
    <div className={styles.CategoriesList}>
      <Link href="#">
        <a className={styles["CategoriesList-Header"]}>All {category.count}</a>
      </Link>
      <List>
        {category.categories.map((category) => (
          <Item
            key={category.uniqueId}
            data={category}
            hasNestedList={category.subCategories.length > 0}
          >
            {category.subCategories && (
              <List>
                {category.subCategories.map((subCategory) => {
                  return (
                    <Item
                      key={subCategory.uniqueId + subCategory.title}
                      data={subCategory}
                    />
                  );
                })}
              </List>
            )}
          </Item>
        ))}
      </List>
    </div>
  );
};
