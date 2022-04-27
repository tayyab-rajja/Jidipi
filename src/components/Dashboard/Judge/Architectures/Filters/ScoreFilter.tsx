import styles from "./index.module.scss";
import clsx from "clsx";

interface IProps {
    openSelect: Function;
    openedSelect: String;
}

export default ({ openSelect, openedSelect }: IProps) => {
    return (
        <div className={clsx(styles["filter-item"], styles["score"])}>
            <div className={styles["select-group"]}>
                <div className={styles["select-btn"]}>
                    <div
                        className={styles["content"]}
                        onClick={() => {
                            openSelect("score");
                        }}
                    >
                        <img src={"/images/filters/score.svg"} />
                        <h3 className={styles["label"]}>Score</h3>
                        <img src={"/images/filters/arrow.svg"} />
                    </div>
                    <div className={styles["selected-item"]}></div>
                </div>
                <div
                    className={clsx(
                        styles["select-content"],
                        openedSelect === "score" && styles["open"]
                    )}
                    id="score"
                >
                    <div className={styles["item"]}>
                        <p>No Score</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Average Score 1-2</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Average Score 2-3</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Average Score 3-4</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Average Score 4-5</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Average Score 5-6</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Average Score 6-7</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Average Score 7-8</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Average Score 8-9</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Average Score 9-10</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
