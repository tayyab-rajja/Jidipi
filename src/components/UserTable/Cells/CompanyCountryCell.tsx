import React from "react";
import styles from "../Table.module.scss";
// import { deepValue } from 'helpers';

export default ({
    item,
    calculatePositionOfStickyHeaders,
    config,
    index,
}: any) => {
    return (
        <td
            className={`text-center ${styles["nationality-td"]}, ${
                index === 0 ? styles["first-cell"] : ""
            }`}
            style={{
                ...calculatePositionOfStickyHeaders(config),
                verticalAlign: "middle",
            }}
        >
            <img
                src={
                    item.companyCountry?.logoId.liveURL ||
                    "https://upload.jidipi.com/categories/location/worldwide.svg"
                }
                alt={item.companyCountry?.title}
                width={28}
                loading="lazy"
            />
        </td>
    );
};
