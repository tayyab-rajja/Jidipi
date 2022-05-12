import styles from "./Form.module.scss";
import Image from "next/image";
import clsx from "clsx";
import UpdateButton from "public/images/profile/icons/update-button.svg";
import { useState } from "react";

interface IProps {
    value: string;
    handleChange: (prop: string, value: string) => void;
    classes: string[];
    prop: string;
    placeholder: string;
}
export default function InputContainer({
    value,
    handleChange,
    classes,
    prop,
    placeholder,
}: IProps) {
    const [isActive, setIsActive] = useState(false);
    const inputChange = (event: any) => {
        console.log(prop, "prop");
        console.log(event.target.value, "value");
        handleChange(prop, event.target.value);
        setIsActive(true);
    };

    const updateClickHandler = () => {
        setIsActive(false);
    };
    return (
        <div className={clsx(styles["input-container"], "mb-3", ...classes)}>
            <input
                type="text"
                className={clsx(
                    styles["custom-input"],
                    isActive && styles["active"]
                )}
                value={value}
                onChange={inputChange}
                placeholder={ placeholder }
            />
            {isActive && (
                <button
                    className={styles["update-button"]}
                    onClick={updateClickHandler}
                >
                    <Image src={UpdateButton} alt="update button" />
                </button>
            )}
        </div>
    );
}
