import React from "react";
import styles from "../Table.module.scss";

export default ({
    calculatePositionOfStickyHeaders,
    config,
    index,
    targetRole,
}: any) => {
    return (
        <td
            className={`${styles["role-cell"]} text-end ${
                index === 0 ? styles["first-cell"] : ""
            }`}
            style={{
                ...calculatePositionOfStickyHeaders(config),
                verticalAlign: "middle",
            }}
        >
            {targetRole && (
                <span className={styles[`role-${targetRole.title}`]}>
                    {targetRole.title.capitalize()}
                </span>
            )}
        </td>
    );
};
