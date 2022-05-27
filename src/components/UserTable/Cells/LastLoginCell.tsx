import React, { useMemo } from "react";
import moment from "moment";
import styles from "../Table.module.scss";

export default function LastLoginCell({
    item,
    calculatePositionOfStickyHeaders,
    config,
    config: { prop = "lastLoginAt" },
    index,
}: any) {
    const lastLogin = useMemo(
        () =>
            item.lastLoginAt
                ? moment(item[prop]).format("YYYY-MM-DD hh:mm")
                : "-",
        [item.lastLoginAt]
    );

    return (
        <td
            className={`text-center ${index === 0 ? styles["first-cell"] : ""}`}
            style={calculatePositionOfStickyHeaders(config)}
        >
            {lastLogin}
        </td>
    );
};
