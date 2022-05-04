import { useEffect } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import Image from "next/image";
import ArrowIcon from "public/images/filters/arrow.svg";
import DeleteIcon from "public/images/filters/xmark.svg";
import useFilterSelect from "src/hooks/useFilterSelect";
import { FilterItem } from "constant/filters/interface";

interface IProps {
    id: string;
    className: string;
    options: FilterItem[];
    placeholder: string;
    prop: string;
    icon: StaticImageData;
    value: string | number | boolean | undefined;
    handleChange: Function;
}

export default ({
    className,
    id,
    options,
    placeholder,
    handleChange,
    prop,
    icon,
    value,
}: IProps) => {
    const {
        selectedItem,
        selectState,
        setSelectState,
        select,
        handleSelect,
        removeSelectedItem,
    } = useFilterSelect<FilterItem>();
    useEffect(() => {
        handleChange(prop, selectedItem);
    }, [selectedItem]);

    const item = options.find((item) => item._id === value);
    if (prop === "score") {
        console.log("value");
        console.log(value);
        console.log("item");
        console.log(item);
    }

    return (
        <div
            ref={select}
            className={clsx(styles["filter-item"], styles[className])}
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
                            <Image src={icon} alt="award icon" />
                            <h3 className={styles["label"]}>{placeholder}</h3>
                            <Image src={ArrowIcon} alt="expand icon" />
                        </div>
                    )}
                    {selectState === "selected" && item && (
                        <div
                            className={clsx(
                                styles["selected-item"],
                                styles["show-flex"]
                            )}
                        >
                            <h3 className={styles["label"]}>
                                {`${item.title}${
                                    item.count ? ` (${item.count})` : ""
                                }`}
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
                    id={id}
                >
                    {options.map((item: FilterItem) => {
                        return (
                            <div
                                key={item._id}
                                className={styles["item"]}
                                onClick={() => handleSelect(item)}
                            >
                                <p>{`${item.title}${
                                    item.count ? ` (${item.count})` : ""
                                }`}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
