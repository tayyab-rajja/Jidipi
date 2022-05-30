import React from "react";
import styles from "../Table.module.scss";

export default function TeamCell({
    calculatePositionOfStickyHeaders,
    config,
    team,
    index,
}: any) {
    return (
        <td
            className={`text-center ${index === 0 ? styles["first-cell"] : ""}`}
            style={calculatePositionOfStickyHeaders(config)}
        >
            {team.name}
        </td>
    );
};
