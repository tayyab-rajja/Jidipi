import styles from "./index.module.scss";
import clsx from "clsx";
import Image from "next/image";
import SearchIcon from "public/images/filters/search.svg";
import DeleteIcon from "public/images/filters/xmark.svg";
import { useEffect, useRef } from "react";

interface IProps {
    value: any;
    handleChange: Function;
    prop: string;
}

export default ({ handleChange, value, prop }: IProps) => {
    const input = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const inputElement = input.current as HTMLInputElement;
        const handleSearchConfirm = (e: KeyboardEvent) => {
            if (e.key === "Enter" || e.keyCode === 13) {
                const value = (e.target as HTMLInputElement).value;
                handleChange(prop, value);
                inputElement.value = "";
            }
        };
        inputElement.addEventListener("keyup", handleSearchConfirm);

        return () =>
            inputElement.removeEventListener("keyup", handleSearchConfirm);
    }, []);
    const removeSearchElement = () => {
        handleChange(prop, "");
    };
    return (
        <div className={clsx(styles["filter-item"], styles["search-section"])}>
            <div className={styles["search"]}>
                <div
                    className={clsx(
                        styles["input-group"],
                        value && styles["hide"]
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
                    {value && (
                        <div
                            className={`${styles["item"]} align-items-center d-flex`}
                        >
                            {value}
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
