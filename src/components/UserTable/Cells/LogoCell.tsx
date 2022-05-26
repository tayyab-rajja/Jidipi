import React from "react";
import styles from "../Table.module.scss";

// import DefaultCompany from 'assets/svgs/common/default-company.svg'
export default ({
    item,
    calculatePositionOfStickyHeaders,
    config,
    index,
}: any) => {
    return (
        <td
            className={`text-center ${
                index === 0 ? styles["first-cell"] : ""
            } p-0 d-flex`}
            style={{ ...calculatePositionOfStickyHeaders(config), width: 44 }}
        >
            <img
                src={
                    item[config.prop] ||
                    "https://upload.jidipi.com/logo/default.svg"
                }
                style={{ width: "100%" }}
                loading="lazy"
            />
        </td>
    );
};
