import styles from "./index.module.scss";
import clsx from "clsx";

interface IProps {
    openSelect: Function;
    openedSelect: String;
}

export default ({ openSelect, openedSelect }: IProps) => {
    return (
        <div className={clsx(styles["filter-item"], styles["category"])}>
            <div className={styles["select-group"]}>
                <div className={styles["select-btn"]}>
                    <div
                        className={styles["content"]}
                        onClick={() => {
                            openSelect("category");
                        }}
                    >
                        <img src={"/images/filters/list.svg"} />
                        <h3 className={styles["label"]}>Category</h3>
                        <img src={"/images/filters/arrow.svg"} />
                    </div>
                    <div className={styles["selected-item"]}></div>
                </div>
                <div
                    className={clsx(
                        styles["select-content"],
                        openedSelect === "category" && styles["open"]
                    )}
                    id="category"
                >
                    <div className={styles["item"]}>
                        <p>Residential Architecture</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Commercial Architecture</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Hospitality and Entertain</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Cultural Architecture</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Educational Architecture</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Sport Architecture</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Public Architecture</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Healthcare Architecture</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Religious Architecture</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Infrastructure</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
