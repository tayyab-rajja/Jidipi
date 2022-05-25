import React, { useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import styles from "../Table.module.scss";
import clsx from "clsx";

export default ({
    item,
    calculatePositionOfStickyHeaders,
    config,
    index,
}: any) => {
    // @ts-ignore
    let roles = useSelector((state) => state.roles.roles);
    const stuffRoles = useMemo(
        () => ["admin", "editor", "manager", "seller"],
        []
    );
    roles = roles
        .filter((role: any) => stuffRoles.some((r) => r === role.title))
        .reverse();

    const isUserRole = useCallback(
        (role) => {
            return item.roles.some((r: any) => r === role._id)
                ? styles["user-has-role"]
                : "";
        },
        [item.roles]
    );
    useEffect(() => {}, [roles]);
    return (
        <td
            className={`text-center p-0 ${
                index === 0 ? styles["first-cell"] : ""
            }`}
            style={{
                ...calculatePositionOfStickyHeaders(config),
                verticalAlign: "middle",
            }}
        >
            <div
                className={clsx(
                    "overview-cell",
                    "d-flex",
                    "align-items-center",
                    "justify-content-center"
                )}
            >
                {roles.map((role: any) => (
                    <div
                        key={role.title}
                        className={`d-flex justify-content-center align-items-center py-1 ${isUserRole(
                            role
                        )}`}
                    >
                        <span>{role.title.capitalize()}</span>
                    </div>
                ))}
            </div>
        </td>
    );
};
