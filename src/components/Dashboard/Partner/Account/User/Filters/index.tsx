import globalStyles from "src/components/Dashboard/Filters/index.module.scss";
import SearchFilter from "src/components/Dashboard/Filters/SearchFilter";
import { postFilters } from "types/queryParameters";
import Plus from "public/images/icons/Plus.svg";
import styles from "./Filters.module.scss";
import Image from "next/image";

interface IProps {
    handleChange: (prop: string, itemId: string) => void;
    filterParameters: postFilters;
}

export default function Filters({ handleChange, filterParameters }: IProps) {
    return (
        <div className={globalStyles["filters-container"]}>
            <button className={styles["add-button"]}>
                <div className="d-flex justify-content-center align-items-center">
                    <Image src={Plus} alt="add icon" />
                    <span className="ms-3">Add</span>
                </div>
            </button>
            <SearchFilter
                handleChange={handleChange}
                value={filterParameters["searchKey"]}
                prop="searchKey"
                gridClass={styles["search-filter"]}
            />
        </div>
    );
}
