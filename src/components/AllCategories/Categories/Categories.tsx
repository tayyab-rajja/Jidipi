import { FC } from "react";
import { ICategory } from "types/categoryTypes";

import styles from './Categories.module.css';

interface Props {
    categories: ICategory[],
}

export const Categories: FC<Props> = ({categories}) => {
    return (
        <div className={styles["Category-Container"]}>
            {categories?.map((category: ICategory) => (
                <div key={category.uniqueId} className={styles["CategoryCard-Text"]}>
                    {category.title} ({category.count})
                </div>
            ))}
    </div>
    )
}