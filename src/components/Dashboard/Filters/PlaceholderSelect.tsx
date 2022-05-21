import { useEffect } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import Image from "next/image";
import ArrowIcon from "public/images/icons/arrow.svg";
import DeleteIcon from "public/images/icons/xmark.svg";
import useFilterSelect from "src/hooks/useFilterSelect";
import { FilterItem } from "constant/filters/interface";

interface IProps {
    id: string;
    className: string;
    options: FilterItem[];
    placeholder: string;
    prop: string;
    icon: StaticImageData | string;
    value: string | number | boolean | undefined;
    handleChange: Function;
}

function PlaceholderSelect({
    className,
    id,
    options,
    placeholder,
    handleChange,
    prop,
    icon,
    value,
}: IProps) {
    const {
        selectedItem,
        setSelectedItem,
        selectState,
        setSelectState,
        select,
        handleSelect,
        removeSelectedItem,
    } = useFilterSelect<FilterItem>();

    useEffect(() => {
        const item = options?.find((item) => item._id == value);
        setSelectedItem(item || null);
        if (item) {
            setSelectState("selected");
        }
    }, []);

    useEffect(() => {
        handleChange(prop, selectedItem?._id);
    }, [selectedItem]);

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
                            <Image src={icon} alt={`${id} ${icon}`} />
                            <h3 className={styles["label"]}>{placeholder}</h3>
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
                                {`${selectedItem.title}${
                                    selectedItem.count
                                        ? ` (${selectedItem.count})`
                                        : ""
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
                    {options?.map((item: FilterItem) => {
                        return (
                            <div
                                key={item._id}
                                className={styles["item"]}
                                onClick={() => handleSelect(item)}
                            >
                                <p>{`${item.title}${
                                    item.count || item.count === 0
                                        ? ` (${item.count})`
                                        : ""
                                }`}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PlaceholderSelect;
