import { useState, useRef } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import Image from "next/image";
import AwardIcon from "public/images/filters/award.svg";
import ArrowIcon from "public/images/filters/arrow.svg";
import DeleteIcon from "public/images/filters/xmark.svg";
import { data, IItem } from "constant/filters/award";
import useFilterSelect from "src/hooks/useFilterSelect";
interface IProps {
    // openSelect: Function;
    // openedSelect: String;
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
            className={clsx(styles["filter-item"], styles["award"])}
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
                            <Image src={AwardIcon} alt="award icon" />
                            <h3 className={styles["label"]}>Award</h3>
                            <Image src={ArrowIcon} alt="expand icon" />
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
                    id="award"
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
