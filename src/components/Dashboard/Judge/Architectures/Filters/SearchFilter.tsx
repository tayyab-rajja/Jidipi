import styles from "./index.module.scss";
import clsx from "clsx";
import Image from "next/image";
import SearchIcon from "public/images/filters/search.svg";
import DeleteIcon from "public/images/filters/xmark.svg";
import { useEffect, useRef, useState } from "react";

export default () => {
    const input = useRef<HTMLInputElement | null>(null);
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        const inputElement = input.current as HTMLInputElement;
        const handleSearchConfirm = (e: KeyboardEvent) => {
            if (e.key === "Enter" || e.keyCode === 13) {
                const value = (e.target as HTMLInputElement).value;
                setSearchValue(value);
                inputElement.value = "";
            }
        };
        inputElement.addEventListener("keyup", handleSearchConfirm);

        return () =>
            inputElement.removeEventListener("keyup", handleSearchConfirm);
    }, []);
    const removeSearchElement = () => {
        setSearchValue("");
    };
    return (
        <div className={clsx(styles["filter-item"], styles["search-section"])}>
            <div className={styles["search"]}>
                <div
                    className={clsx(
                        styles["input-group"],
                        searchValue && styles["hide"]
                    )}
                >
                    <div className={styles["icon"]}>
                        <Image src={SearchIcon} alt="search icon" />
                    </div>
                    <input
                        ref={input}
                        className={styles["search-input"]}
                        placeholder="Search"
                    />
                </div>
                <div className={styles["search-data"]}>
                    {searchValue && (
                        <div
                            className={`${styles["item"]} align-items-center d-flex`}
                        >
                            {searchValue}
                            <Image
                                src={DeleteIcon}
                                onClick={removeSearchElement}
                            ></Image>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
