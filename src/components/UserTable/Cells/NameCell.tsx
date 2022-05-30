import React from "react";
import styles from "../Table.module.scss";
// import DefaultUserAvatar from 'assets/svgs/common/default-avatar.svg';

export default function NameCell({
    item,
    calculatePositionOfStickyHeaders,
    config,
    index,
}: any) {
    return (
        <td
            className={`${styles["name"]} text-center ${
                index === 0 ? styles["first-cell"] : ""
            }`}
            style={{
                ...calculatePositionOfStickyHeaders(config),
                verticalAlign: "middle",
            }}
        >
            <div>
                <img
                    src={
                        item.avatar ||
                        "https://upload.jidipi.com/avatars/default.svg"
                    }
                    alt="Avatar"
                    height={24}
                    width={24}
                    loading="lazy"
                />
                {`${item.firstName} ${item.lastName}`}
            </div>
        </td>
    );
};
