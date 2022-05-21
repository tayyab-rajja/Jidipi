import styles from "src/components/Dashboard/Filters/index.module.scss";
import SearchFilter from "src/components/Dashboard/Filters/SearchFilter";
import { postFilters } from "types/queryParameters";

interface IProps {
    handleChange: (prop: string, itemId: string) => void;
    filterParameters: postFilters;
}

export default function Filters({ handleChange, filterParameters }: IProps) {
    return (
        <div className={styles["filters-container"]}>
            <button
                style={{
                    padding: "10px",
                    borderRadius: 5,
                    width: 100,
                    border: "1px solid #d6d6d6",
                    margin: "0 8px 16px",
                }}
            >
                Add
            </button>
            <SearchFilter
                handleChange={handleChange}
                value={filterParameters["searchKey"]}
                prop="searchKey"
            />
        </div>
    );
}
