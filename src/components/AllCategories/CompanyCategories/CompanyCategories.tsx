import { FC } from "react";
import { ICompany } from "types/categoryTypes";
import { CompanyCard } from "./CompanyCard/CompanyCard";

import styles from "./CompanyCategories.module.css";

interface Props {
  categories: ICompany[];
}

export const CompanyCategories: FC<Props> = ({ categories }) => {
  return (
    <div className={styles["CompanyCategory-Container"]}>
      {categories?.map((company: ICompany) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>
  );
};
