import { useState, useRef } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import Image from "next/image";
import AwardIcon from "public/images/filters/award.svg";
import ArrowIcon from "public/images/filters/arrow.svg";
import DeleteIcon from "public/images/filters/xmark.svg";
import useClickOutside from "src/hooks/useClickOutside";
interface IProps {
    openSelect: Function;
    openedSelect: String;
}

interface IItem {
    message: string;
    id: number;
}

type selectState = "normal" | "opened" | "selected";

export default ({ openSelect, openedSelect }: IProps) => {
    const select = useRef(null);
    useClickOutside(select, () => {
        setSelectState((value) => {
            console.log("value")
            console.log(value)
            if (value === "opened") {
                setSelectedItem(null);
                return "normal";
            }
            return value;
        });
    });
    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
    const [selectState, setSelectState] = useState<selectState>("normal");
    const items = [
        {
            message: "Best Building 2022 (245)",
            id: 1,
        },
        {
            message: "Best Aesthetic Architecture (345)",
            id: 2,
        },
        {
            message: "Best Technology Architecture (345)",
            id: 3,
        },
        {
            message: "Most Innovative Architecture (345)",
            id: 4,
        },
        {
            message: "Most Popular Architecture (345)",
            id: 5,
        },
        {
            message: "Most Stylish Architecture (345)",
            id: 6,
        },
        {
            message: "Most Stylish Architecture (345)",
            id: 7,
        },
        {
            message: "Most Stylish Architecture (345)",
            id: 8,
        },
        {
            message: "Most Stylish Architecture (345)",
            id: 9,
        },
        {
            message: "Most Stylish Architecture (345)",
            id: 10,
        },
        {
            message: "Most Stylish Architecture (345)",
            id: 11,
        },
        {
            message: "Most Stylish Architecture (345)",
            id: 12,
        },
        {
            message: "Most Stylish Architecture (345)",
            id: 13,
        },
        {
            message: "Most Stylish Architecture (345)",
            id: 14,
        },
    ];

    const handleChange = (item: IItem) => {
        setSelectedItem(item);
        setSelectState("selected");
    };

    const removeSelectedItem = () => {
        setSelectedItem(null);
        setSelectState("normal");
    };
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
                                {selectedItem.message}
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
                    {items.map((item: IItem) => {
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
