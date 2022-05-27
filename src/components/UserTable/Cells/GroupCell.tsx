import clsx from "clsx";
import React from "react";
import styles from "Table.module.scss";

export default function GroupCell({
    calculatePositionOfStickyHeaders,
    config,
    index,
    item,
}: any) {
    return (
        <td
            className={`${styles["group-cell"]} ${
                index === 0 ? styles["first-cell"] : ""
            }`}
            style={{
                ...calculatePositionOfStickyHeaders(config),
                verticalAlign: "middle",
            }}
        >
            {item.companyGroup && (
                <span
                    className={clsx(styles[`${item.companyGroup.title.toLowerCase()}-group`])}
                >
                    {item.companyGroup.title}
                </span>
            )}
        </td>
    );
};
