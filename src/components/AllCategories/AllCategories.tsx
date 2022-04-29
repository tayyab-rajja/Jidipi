import { FC } from "react";
import { useRouter } from "next/router";

import { usePageFolderByName } from "src/api/usePageFolderByName";
import { getCategory } from "helpers/getCategory";
import { useCategories } from "src/components/Categories/useCategories";

import { Alphabet } from "./Alphabet/Alphabet";
import { CompanyCategories } from "./CompanyCategories/CompanyCategories";

import styles from "./AllCategories.module.css";
import { Categories } from "./Categories/Categories";

export const AllCategories: FC = () => {
    const { query } = useRouter();
    const { data: pageFolder } = usePageFolderByName(
        (query.folder as string) ?? null
    );
    const { categories } = useCategories((pageFolder?._id as string) ?? null);

    const category = getCategory(categories, query.category as string);
    console.log(category);

    const isCompanies =
        query.category === "brand" || query.category === "architect";

    return (
        <div className={styles["AllCategories-Container"]}>
            <Alphabet />
            {isCompanies ? <CompanyCategories categories={category} /> : <Categories categories={category} />}
        </div>
    )
}