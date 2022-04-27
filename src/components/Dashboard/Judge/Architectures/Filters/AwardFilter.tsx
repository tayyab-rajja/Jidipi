import styles from "./index.module.scss";
import clsx from "clsx";

interface IProps {
    openSelect: Function;
    openedSelect: String;
}

export default ({ openSelect, openedSelect }: IProps) => {
    return (
        <div className={clsx(styles["filter-item"], styles["award"])}>
            <div className={styles["select-group"]}>
                <div className={styles["select-btn"]}>
                    <div
                        className={styles["content"]}
                        onClick={() => {
                            openSelect("award");
                        }}
                    >
                        <img src={"/images/filters/award.svg"} />
                        <h3 className={styles["label"]}>Award</h3>
                        <img src={"/images/filters/arrow.svg"} />
                    </div>
                    <div className={styles["selected-item"]}></div>
                </div>
                <div
                    className={clsx(
                        styles["select-content"],
                        openedSelect === "award" && styles["open"]
                    )}
                    id="award"
                >
                    <div className={styles["item"]}>
                        <p>Best Building 2022 (245)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Best Aesthetic Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Best Technology Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Innovative Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Popular Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Stylish Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Stylish Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Stylish Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Stylish Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Stylish Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Stylish Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Stylish Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Stylish Architecture (345)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Most Stylish Architecture (345)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
