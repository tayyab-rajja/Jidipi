import styles from "./index.module.scss";
import clsx from "clsx";

interface IProps {
    openSelect: Function;
    openedSelect: String;
}

export default ({ openSelect, openedSelect }: IProps) => {
    return (
        <div className={clsx(styles["filter-item"], styles["candidates"])}>
            <div className={styles["select-group"]}>
                <div className={styles["select-btn"]}>
                    <div
                        className={styles["content"]}
                        onClick={() => {
                            openSelect("candidates");
                        }}
                    ></div>
                </div>
                <div
                    className={clsx(
                        styles["select-content"],
                        openedSelect === "candidates" && styles["open"]
                    )}
                    id="candidates"
                >
                    <div className={styles["item"]}>
                        <div
                            className={clsx(
                                styles["all"],
                                styles["item-content"],
                                styles["active"]
                            )}
                        >
                            <div className={styles["icon"]}></div>
                            <div
                                className={clsx(
                                    styles["title"],
                                    styles["text-start"]
                                )}
                            >
                                All Candidate (18,345)
                            </div>
                        </div>
                    </div>
                    <div className={styles["item"]}>
                        <div
                            className={clsx(
                                styles["review"],
                                styles["item-content"]
                            )}
                        >
                            <div className={styles["icon"]}></div>
                            <div
                                className={clsx(
                                    styles["title"],
                                    styles["text-start"]
                                )}
                            >
                                Waiting to Review (4523)
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles["item"], styles["draft"])}>
                        <div
                            className={clsx(
                                styles["draft"],
                                styles["item-content"]
                            )}
                        >
                            <div className={styles["icon"]}></div>
                            <div
                                className={clsx(
                                    styles["title"],
                                    styles["text-start"]
                                )}
                            >
                                Saved as Draft (4523)
                            </div>
                        </div>
                    </div>
                    <div className={styles["item"]}>
                        <div
                            className={clsx(
                                styles["scheduled"],
                                styles["item-content"]
                            )}
                        >
                            <div className={styles["icon"]}></div>
                            <div
                                className={clsx(
                                    styles["title"],
                                    styles["text-start"]
                                )}
                            >
                                Scheduled to publish (1,234)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
