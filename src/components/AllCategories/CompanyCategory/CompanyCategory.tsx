import { useRouter } from "next/router";
import { FC } from "react";
import { usePageFolderByName } from "src/api/usePageFolderByName";
import { ICompany } from "types/categoryTypes";
import { useCategories } from "../../Categories/useCategories";
import { CompanyCard } from "./CompanyCard/CompanyCard";

import styles from "./CompanyCategory.module.css";

export const CompanyCategory: FC = () => {

    const { query } = useRouter();
    const { data: pageFolder } = usePageFolderByName((query.folder as string) ?? null);
    const {categories} = useCategories((pageFolder?._id as string) ?? null);

    return (
        <div className={styles["CompanyCategory-Container"]}>
            {categories?.companies.map((company: ICompany) => (
                <CompanyCard key={company._id} company={company}/>
            ))}
        </div>
    );
}
