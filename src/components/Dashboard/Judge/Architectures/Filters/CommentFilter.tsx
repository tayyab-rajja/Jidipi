import styles from "./index.module.scss";
import clsx from "clsx";

interface IProps {
    openSelect: Function;
    openedSelect: String;
}

export default ({ openSelect, openedSelect }: IProps) => {
    return (
        <div className={clsx(styles["filter-item"], styles["comment"])}>
            <div className={styles["select-group"]}>
                <div className={styles["select-btn"]}>
                    <div
                        className={styles["content"]}
                        onClick={() => {
                            openSelect("comment");
                        }}
                    >
                        <img src={"/images/filters/chat.svg"} />
                        <h3 className={styles["label"]}>Comment</h3>
                        <img src={"/images/filters/arrow.svg"} />
                    </div>
                    <div className={styles["selected-item"]}></div>
                </div>
                <div
                    className={clsx(
                        styles["select-content"],
                        openedSelect === "comment" && styles["open"]
                    )}
                    id="comment"
                >
                    <div className={styles["item"]}>
                        <p>No Comment (22)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Commented (2341)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
