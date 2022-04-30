import styles from "./index.module.scss";
import clsx from "clsx";
import Image from "next/image";
import StarIcon from "public/images/filters/star.svg";
import ArrowIcon from "public/images/filters/arrow.svg";
import DeleteIcon from "public/images/filters/xmark.svg";
import { data, IItem } from "constant/filters/rating";
import useFilterSelect from "src/hooks/useFilterSelect";
interface IProps {
    openSelect: Function;
    openedSelect: String;
}

export default ({ openSelect, openedSelect }: IProps) => {
    const {
        selectedItem,
        selectState,
        setSelectState,
        select,
        handleChange,
        removeSelectedItem,
    } = useFilterSelect<IItem>();

    return (
        <div
            ref={select}
            className={clsx(styles["filter-item"], styles["rating"])}
        >
            <div className={styles["select-group"]}>
                <div className={styles["select-btn"]}>
                    {(selectState === "normal" || selectState === "opened") && (
                        <div
                            className={styles["content"]}
                            onClick={() => {
                                setSelectState((value) =>
                                    value === "opened" ? "normal" : "opened"
                                );
                            }}
                        >
                            <Image src={StarIcon} alt="star icon" />
                            <h3 className={styles["label"]}>Rating</h3>
                            <Image src={ArrowIcon} alt="arrow icon" />
                        </div>
                    )}
                    {selectState === "selected" && selectedItem && (
                        <div
                            className={clsx(
                                styles["selected-item"],
                                styles["show-flex"]
                            )}
                        >
                            <h3 className={styles["label"]}>
                                {`${selectedItem.message} (${selectedItem.count})`}
                            </h3>
                            <Image
                                src={DeleteIcon}
                                alt="delete icon"
                                onClick={removeSelectedItem}
                            />
                        </div>
                    )}
                </div>
                <div
                    className={clsx(
                        styles["select-content"],
                        selectState === "opened" && styles["open"]
                    )}
                    id="rating"
                >
                    {data.map((item: IItem) => {
                        return (
                            <div
                                key={item.id}
                                className={styles["item"]}
                                onClick={() => handleChange(item)}
                            >
                                <p>{`${item.message} (${item.count})`}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
