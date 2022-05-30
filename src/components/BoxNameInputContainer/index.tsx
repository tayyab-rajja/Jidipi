import React from "react";
import styles from "./style.module.scss";
import clsx from "clsx";

export default function InputContainer(props: any) {
    const inputFirstName = {
        className: `prevent input-field ${props.firstName.inputClass || ""}`,
        type: props.firstName.type || "text",
        value: props.firstName.value,
        onChange: props.firstName.handleChange,
        disabled: props.firstName.disabled,
        name: props.firstName.name,
    } as any;
    const inputLastName = {
        className: `prevent input-field ${props.lastName.inputClass || ""}`,
        type: props.lastName.type || "text",
        value: props.lastName.value,
        onChange: props.lastName.handleChange,
        disabled: props.lastName.disabled,
        name: props.lastName.name,
    } as any;

    if (props.firstName.validate) {
        inputFirstName.onBlur = (event: any) => {
            props.lastName.validate(event.target.value);
        };
    }
    if (props.lastName.validate) {
        inputLastName.onBlur = (event: any) => {
            props.lastName.validate(event.target.value);
        };
    }

    return (
        <div
            className={`${styles["input-container"]} ${
                props.validationError && "invalid"
            } ${props.className || ""} ${styles["box-input-container"]} ${
                styles["custom-input-container"]
            }`}
        >
            <div className={`d-flex align-items-center ${styles["box"]}`}>
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <div
                        className={`${styles["title"]} ${
                            props.placeholder ? "" : "d-none"
                        }`}
                    >
                        {props.placeholder}
                    </div>
                </div>
                <div className={styles["input-container"]}>
                    <input {...inputFirstName} />
                </div>
                <div className={clsx(styles["input-container"], "flex-grow-1")}>
                    <input {...inputLastName} />
                </div>
            </div>

            {props.validationError && (
                <p className="input-validation-error mt-1 text-left">
                    {props.validationError}
                </p>
            )}
        </div>
    );
}
