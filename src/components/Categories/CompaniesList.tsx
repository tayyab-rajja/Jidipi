import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ICompany, ICompanyTab } from "types/categoryTypes";

import styles from "./Categories.module.css";

const List: FC = ({ children }) => {
  return <ul className={styles["CategoriesList-List"]}>{children}</ul>;
};

const Item: FC<{
  data: ICompany;
}> = ({ data }) => {
  const { query } = useRouter();

  return (
    <li>
      <Link href={`/${query.folder}/${data.slug}`}>
        <a className={styles["CategoriesList-ItemLink"]}>
          {data.title} <span>{data.count}</span>
        </a>
      </Link>
    </li>
  );
};

export const CompaniesList: FC<ICompanyTab> = ({
  companies,
  allRouteName,
  companiesCount,
}) => {
  const { query } = useRouter();

  return (
    <div className={styles.CategoriesList}>
      <Link href={`/${query.folder}/${allRouteName.toLocaleLowerCase()}/all`}>
        <a className={styles["CategoriesList-Header"]}>All {companiesCount}</a>
      </Link>
      <List>
        {companies.map((company) => (
          <Item key={company.partnerId} data={company} />
        ))}
      </List>
    </div>
  );
};
