import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { data, IItem } from "constant/filters/candidate";
import useFilterSelect from "src/hooks/useFilterSelect";

interface IProps {
    // openSelect: Function;
    // openedSelect: string;
}

export default () => {
    const prevSelected = useRef<IItem | null>(null);
    const {
        selectedItem,
        selectState,
        setSelectState,
        select,
        handleChange,
        setSelectedItem,
    } = useFilterSelect<IItem>();
    useEffect(() => {
        prevSelected.current = data[0];
        setSelectedItem(data[0]);
    }, []);
    return (
        <div
            ref={select}
            className={clsx(styles["filter-item"], styles["candidates"])}
        >
            <div className={styles["select-group"]}>
                <div className={styles["select-btn"]}>
                    <div
                        className={styles["content"]}
                        onClick={() => {
                            setSelectState((value) =>
                                value === "opened" ? "normal" : "opened"
                            );
                        }}
                    >
                        <div
                            className={clsx(
                                prevSelected.current && styles[prevSelected.current.class],
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
                                {prevSelected.current &&
                                    `${prevSelected.current.message} (${prevSelected.current.count})`}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={clsx(
                        styles["select-content"],
                        selectState === "opened" && styles["open"]
                    )}
                    id="candidates"
                >
                    {data.map((item) => {
                        return (
                            <div key={item.id} className={styles["item"]}>
                                <div
                                    className={clsx(
                                        styles[item.class],
                                        styles["item-content"],
                                        selectedItem &&
                                            selectedItem.id === item.id &&
                                            styles["active"]
                                    )}
                                    onClick={() => {
                                        handleChange(item);
                                        prevSelected.current = item;
                                    }}
                                >
                                    <div className={styles["icon"]}></div>
                                    <div
                                        className={clsx(
                                            styles["title"],
                                            styles["text-start"]
                                        )}
                                    >
                                        {`${item.message} (${item.count})`}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
