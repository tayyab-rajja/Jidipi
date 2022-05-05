import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { data } from "constant/filters/candidate";
import useFilterSelect from "src/hooks/useFilterSelect";
import { FilterItem } from "constant/filters/interface";

interface IProps {
    value: any;
    handleChange: Function;
    prop: string;
    statuses: { [key: string]: number }
}

export default ({ handleChange, value, prop, statuses }: IProps) => {
    const prevSelected = useRef<FilterItem | null>(null);

    data.forEach((item: FilterItem) => {
        item.count = statuses?.[item._id] || 0
    })

    const {
        selectedItem,
        selectState,
        setSelectState,
        select,
        handleSelect,
        setSelectedItem,
    } = useFilterSelect<FilterItem>();
    useEffect(() => {
        handleChange(prop, value || data[0]._id);
        const item = data.find((item) => item._id === value);
        if (item) {
            prevSelected.current = item;
            setSelectedItem(item);
        } else {
            prevSelected.current = data[0];
            setSelectedItem(data[0]);
        }
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
                                prevSelected.current &&
                                    prevSelected.current.class &&
                                    styles[prevSelected.current.class],
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
                                    `${prevSelected.current.title} (${prevSelected.current.count})`}
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
                            <div key={item._id} className={styles["item"]}>
                                <div
                                    className={clsx(
                                        item.class && styles[item.class],
                                        styles["item-content"],
                                        selectedItem &&
                                            selectedItem._id === item._id &&
                                            styles["active"]
                                    )}
                                    onClick={() => {
                                        handleChange(prop, item._id);
                                        handleSelect(item);
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
                                        {`${item.title} (${item.count})`}
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
