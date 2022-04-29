import { FC } from "react";

import { Alphabet } from "./Alphabet/Alphabet";
import { CompanyCategory } from "./CompanyCategory/CompanyCategory";

import styles from "./AllCategories.module.css";

export const AllCategories: FC = () => {
    return (
        <div className={styles["AllCategories-Container"]}>
            <Alphabet />
            <CompanyCategory />
        </div>
    )
}