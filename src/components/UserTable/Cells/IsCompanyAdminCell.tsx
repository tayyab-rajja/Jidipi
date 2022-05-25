import React from "react";
import IconRight from "assets/svgs/actions/icon-right.svg";
import styles from "..Table.module.scss";

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
            } align-middle`}
            style={calculatePositionOfStickyHeaders(config)}
        >
            {item.isCompanyAdmin && <img src={IconRight} alt="icon-right" />}
        </td>
    );
};
