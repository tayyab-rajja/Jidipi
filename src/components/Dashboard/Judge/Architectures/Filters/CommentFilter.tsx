import styles from "./index.module.scss";
import clsx from "clsx";
import Image from 'next/image'
import ChatIcon from 'public/images/filters/chat.svg'
import ArrowIcon from 'public/images/filters/arrow.svg'
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
                        <Image src={ChatIcon} alt="chat icon" />
                        <h3 className={styles["label"]}>Comment</h3>
                        <Image src={ArrowIcon} alt="arrow icon" />
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
