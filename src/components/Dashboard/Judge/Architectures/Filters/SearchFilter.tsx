import styles from "./index.module.scss";
import clsx from "clsx";

interface IProps {
    openSelect: Function;
    openedSelect: String;
}

export default ({ openSelect, openedSelect }: IProps) => {
    return (
        <div className={clsx(styles["filter-item"], styles["search-section"])}>
            <div className={styles["search"]}>
                <div className={styles["input-group"]}>
                    <div className={styles["icon"]}>
                        <img src={"/images/filters/search.svg"} />
                    </div>
                    <input
                        className={styles["search-input"]}
                        placeholder="Search"
                    />
                </div>
                <div className={styles["search-data"]}></div>
            </div>
        </div>
    );
};
