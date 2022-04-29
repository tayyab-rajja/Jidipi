import styles from "./index.module.scss";
import clsx from "clsx";
import Image from 'next/image'
import StarIcon from 'public/images/filters/star.svg'
import ArrowIcon from 'public/images/filters/arrow.svg'
interface IProps {
    openSelect: Function;
    openedSelect: String;
}

export default ({ openSelect, openedSelect }: IProps) => {
    return (
        <div className={clsx(styles["filter-item"], styles["rating"])}>
            <div className={styles["select-group"]}>
                <div className={styles["select-btn"]}>
                    <div
                        className={styles["content"]}
                        onClick={() => {
                            openSelect("rating");
                        }}
                    >
                        <Image src={StarIcon} alt="star icon" />
                        <h3 className={styles["label"]}>Rating</h3>
                        <Image src={ArrowIcon} alt="arrow icon" />
                    </div>
                    <div className={styles["selected-item"]}></div>
                </div>
                <div
                    className={clsx(
                        styles["select-content"],
                        openedSelect === "rating" && styles["open"]
                    )}
                    id="rating"
                >
                    <div className={styles["item"]}>
                        <p>No Rating (33)</p>
                    </div>
                    <div className={styles["item"]}>
                        <p>Rated (2341)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
