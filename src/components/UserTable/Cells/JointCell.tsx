import React, { useMemo } from "react";
import moment from "moment";
import styles from "../Table.module.scss";

export default function JointCell({
    item,
    calculatePositionOfStickyHeaders,
    config,
    index,
}: any) {
    const joint = useMemo(
        () =>
            item.registrationDate
                ? moment(item.registrationDate).format("YYYY-MM-DD")
                : "-",
        [item.createdAt]
    );
    return (
        <td
            className={`text-center ${index === 0 ? styles["first-cell"] : ""}`}
            style={calculatePositionOfStickyHeaders(config)}
        >
            {joint}
        </td>
    );
}
