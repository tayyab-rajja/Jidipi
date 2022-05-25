import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import styles from "../Table.module.scss";

export default ({
    item,
    calculatePositionOfStickyHeaders,
    config,
    index,
}: any) => {
    // @ts-ignore
    let roles = useSelector((state) => state.roles.roles);
    roles = useMemo(
        () =>
            roles.filter((role: any) =>
                item.roles.some((r: any) => r === role._id)
            ),
        [roles, item.roles]
    );
    const managerRole = useMemo(
        () => roles.find((r: any) => r.title === "manager"),
        [roles]
    );
    const editorRole = useMemo(
        () => roles.find((r: any) => r.title === "editor"),
        [roles]
    );
    const renderRole = useCallback(() => {
        let role = managerRole ?? editorRole;
        if (role) {
            return (
                <span className={`role-${role.title}`}>
                    {role.title.capitalize()}
                </span>
            );
        }
    }, [roles]);
    return (
        <td
            className={`${styles["role-cell"]} text-right ${
                index === 0 ? styles["first-cell"] : ""
            }`}
            style={{
                ...calculatePositionOfStickyHeaders(config),
                verticalAlign: "middle",
            }}
        >
            {renderRole()}
        </td>
    );
};
