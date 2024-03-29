import Image from "next/image";
import styles from "./Form.module.scss";
import UpdateButton from "public/images/icons/update-button.svg";
import clsx from "clsx";
import useInputHook from "./useInputHook";

interface IProps {
    icon: StaticImageData | string;
    prop: string;
    placeholder: string;
    handleChange: (prop: string, value: string) => void;
    handleSave: (prop: string, value: string) => void;
    value: string;
}

export default function SocialMediaInput({
    icon,
    prop,
    placeholder,
    handleChange,
    value,
    handleSave,
}: IProps) {
    const { updateClickHandler, inputChange, isActive } = useInputHook({
        handleChange,
        handleSave,
        value,
        prop,
    });

    return (
        <div className={styles["social-input"]}>
            <div className={styles["social-logo"]}>
                <Image src={icon} layout="fill" alt="facebook-icon" />
            </div>

            <div className={styles["input-container"]}>
                <input
                    type="text"
                    className={clsx(
                        styles["custom-input"],
                        isActive && styles["active"]
                    )}
                    placeholder={placeholder}
                    value={value}
                    onChange={inputChange}
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
        </div>
    );
}
