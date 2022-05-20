import styles from "./Form.module.scss";
import clsx from "clsx";
import Image from "next/image";
import Arrow from "public/images/icons/arrow.svg";
import { CategoryAPI } from "types/categoryTypes";
import { useEffect, useState } from "react";

interface IProps {
    categories: CategoryAPI[];
    handleChange: (prop: string, value: string) => void;
    handleSave: (prop: string, value: string) => void;
    value: string[];
}

export default function GroupSelect({ categories: groupsParam }: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [groups, setGroups] = useState<CategoryAPI[]>(
        groupsParam.map((category) => {
            category.active = false;
            return { ...category };
        })
    );
    const [selectedGroups, setSelectedGroups] = useState<
        CategoryAPI[]
    >([]);

    useEffect(() => {
        setSelectedGroups([...groups.filter((category) => category.active)]);
    }, [groups]);

    const handleCategoryClick = (category: CategoryAPI) => {
        setGroups((value) => {
            const groups = [...value.map((c) => ({ ...c }))];
            const groupIndex = groups.findIndex(
                (group) => group._id === category._id
            );
            const group = groups[groupIndex];
            group.active = !group.active;
            return groups;
        });
    };
    return (
        <div className={styles["input-container"]}>
            <div
                className={clsx(styles["filter-item"], styles["groups-filter"])}
            >
                <div className={styles["select-group"]}>
                    <div
                        className={clsx(
                            styles["select-btn"],
                            styles["border-dashed"]
                        )}
                        onClick={() => {
                            setIsOpen((value) => !value);
                        }}
                    >
                        {!selectedGroups.length ? (
                            <div className={clsx(styles["content"])}>
                                <div>
                                    <h3 className={styles["label"]}>Groups</h3>
                                </div>

                                <Image src={Arrow} alt="arrow icon" />
                            </div>
                        ) : (
                            <div
                                className={clsx(
                                    styles["selected-item"],
                                    styles["bg-grey"],
                                    styles["show-flex"]
                                )}
                            >
                                {selectedGroups.map((category) => {
                                    return (
                                        <button
                                            key={category.categoryId._id}
                                            className={
                                                styles[
                                                    category.categoryId.title.toLowerCase()
                                                ]
                                            }
                                        >
                                            {category.categoryId.title}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div
                        className={clsx(
                            styles["select-content"],
                            styles["types"],
                            isOpen && styles["open"]
                        )}
                        id="types"
                    >
                        <div className={styles["buttons"]}>
                            {groups.map((category: CategoryAPI) => {
                                return (
                                    <button
                                        key={category.categoryId._id}
                                        className={clsx(
                                            styles[
                                                category.categoryId.title.toLowerCase()
                                            ],
                                            category.active && styles["active"]
                                        )}
                                        onClick={() =>
                                            handleCategoryClick(category)
                                        }
                                    >
                                        {category.categoryId.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
