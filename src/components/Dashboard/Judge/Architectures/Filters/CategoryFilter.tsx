import styles from "./index.module.scss";
import clsx from "clsx";
import Image from "next/image";
import ListIcon from "public/images/filters/list.svg";
import ArrowIcon from "public/images/filters/arrow.svg";
import DeleteIcon from "public/images/filters/xmark.svg";
import { data, type IItem } from "constant/filters/category";
import useFilterSelect from "src/hooks/useFilterSelect";
interface IProps {
    // openSelect: Function;
    // openedSelect: string;
}

export default () => {
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
            className={clsx(styles["filter-item"], styles["category"])}
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
                            <Image src={ListIcon} alt="list icon" />
                            <h3 className={styles["label"]}>Category</h3>
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
                                {`${selectedItem.message}`}
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
                    id="category"
                >
                    {data.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className={styles["item"]}
                                onClick={() => handleChange(item)}
                            >
                                <p>{item.message}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
