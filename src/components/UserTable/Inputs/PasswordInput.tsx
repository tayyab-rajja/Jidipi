import React from "react";
import PasswordContainer from "src/components/BoxPasswordContainer";
import YearIcon from "public/images/icons/year.svg";
import { generatePassword } from "src/utils/common";
import styles from "../Table.module.scss";

export default React.memo(({ item, handleChange, custom }: any) => {
    return (
        <PasswordContainer
            type="text"
            value={item.password || ""}
            placeholder={"PASSWORD"}
            handleChange={(event: any) =>
                handleChange("password", event.target.value)
            }
            icon={
                <img
                    src={(YearIcon as any).src}
                    className={styles["password-icon"]}
                    onClick={() => {
                        const password = generatePassword();
                        handleChange("password", password);
                    }}
                />
            }
            inputClass="form-control"
            className=""
            custom={custom}
        />
    );
});
