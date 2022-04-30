import styles from "./index.module.scss";
import clsx from "clsx";
import Image from 'next/image'
import SearchIcon from "public/images/filters/search.svg"

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
                        <Image src={SearchIcon} alt="search icon" />
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
