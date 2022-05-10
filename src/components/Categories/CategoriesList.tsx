import Link from "next/link";
import { ICategory, ICategoryTab, ISubCategory } from "types/categoryTypes";

import clsx from "clsx";
import styles from "./Categories.module.css";
import { useRouter } from "next/router";

const List: React.FC = ({ children }) => {
  return <ul className={styles["CategoriesList-List"]}>{children}</ul>;
};

const Item: React.FC<{
  data: ICategory | ISubCategory;
  hasNestedList?: boolean;
}> = ({ data, hasNestedList, children }) => {
  const { query } = useRouter();

  return (
    <li>
      <Link href={`/${query.folder}/categories/${data.uniqueId}`}>
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
  const { query } = useRouter();

  //TODO: there should be refactoring for this code
  const allRouteName =
    category.type === "CATEGORIES" ? "CATEGORY" : category.type;

  return (
    <div className={styles.CategoriesList}>
      <Link href={`/${query.folder}/${allRouteName.toLocaleLowerCase()}/all`}>
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
