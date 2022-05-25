import React from "react";
import styles from "./style.module.scss";
import clsx from "clsx";

export default function PasswordContainer(props: any) {
    const inputProps = {
        className: `prevent input-field ${props.inputClass || ""}`,
        type: props.type || "text",
        value: props.value,
        onChange: props.handleChange,
        disabled: props.disabled,
        name: props.name,
    } as any;

    if (props.validate) {
        inputProps.onBlur = (event: any) => {
            props.validate(event.target.value);
        };
    }

    return (
        <div
            className={`${styles["input-container"]} ${
                props.validationError && "invalid"
            } ${props.className || ""} ${styles["box-input-container"]} ${
                props.custom && styles["custom-input-container"]
            }`}
        >
            <div
                className={clsx(
                    "d-flex",
                    "align-items-center",
                    styles["box"],
                    "position-relative"
                )}
            >
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <div
                        className={`${styles["title"]} ${
                            props.placeholder ? "" : "d-none"
                        }`}
                    >
                        {props.placeholder}
                    </div>
                </div>
                <div className={clsx(styles["input-container"], "flex-grow-1")}>
                    <input {...inputProps} />
                </div>
                {props.icon ? props.icon : null}
            </div>

            {props.validationError && (
                <p className="input-validation-error mt-1 text-left">
                    {props.validationError}
                </p>
            )}
        </div>
    );
}
