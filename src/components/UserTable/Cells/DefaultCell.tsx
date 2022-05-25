import React from "react";
import styles from "../Table.module.scss";

export default ({
    item,
    calculatePositionOfStickyHeaders,
    config,
    index,
}: any) => {
    return (
        <td
            className={`text-${config.direction || "center"} ${
                index === 0 ? styles["first-cell"] : ""
            } align-middle`}
            style={{
                ...calculatePositionOfStickyHeaders(config),
                paddingRight: 26,
                paddingLeft: 26,
            }}
        >
            {item[config.prop]}
        </td>
    );
};
