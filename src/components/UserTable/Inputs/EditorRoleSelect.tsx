import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { reactSelectStyle } from "src/utils/styles";
import styles from "../Table.module.scss";
import clsx from "clsx";

const style = { height: 44 };
export default React.memo(function EditorRoleSelect
    ({ item, handleChange, setSelectOpen: setSelectOpenMainFunc }: any) {
        // @ts-ignore
        let roles = useSelector((state) => state.roles.roles);
        roles = useMemo(
            () =>
                roles.filter(
                    (role: any) =>
                        role.title === "editor" || role.title === "manager"
                ),
            [roles]
        );
        const userRoles = useMemo(
            () =>
                roles.filter((role: any) =>
                    item.roles.some((r: any) => r === role._id)
                ),
            [item.roles, roles]
        );
        const managerRole = useMemo(
            () => userRoles.find((role: any) => role.title === "manager"),
            [userRoles]
        );
        const editorRole = useMemo(
            () => userRoles.find((role: any) => role.title === "editor"),
            [userRoles]
        );
        const rolesOptions = useMemo(() => {
            return roles.map((role: any) => ({
                label: role.title,
                value: role._id,
            }));
        }, [roles]);

        const name = "roles";
        const setSelectOpen = setSelectOpenMainFunc(name);

        const selectValue = useCallback(() => {
            const role = managerRole ?? editorRole;
            return rolesOptions.find((r: any) => r.value === role?._id);
        }, [managerRole, editorRole, rolesOptions]);

        const onChange = (newValue: any) => {
            console.log(newValue);
            if (newValue) {
                if (newValue.label === "manager") {
                    const editorRoleId = roles.find(
                        (role: any) => role.title === "editor"
                    )._id;
                    const itemRoles = [editorRoleId, newValue.value];
                    handleChange("roles", itemRoles);
                } else {
                    const itemRoles = [newValue.value];
                    handleChange("roles", itemRoles);
                }
            } else {
                handleChange("roles", []);
            }
        };

        return (
            <div className={clsx(styles["input-container"])} style={style}>
                <div className="d-flex align-items-center h-100">
                    <div
                        className={clsx(
                            "d-flex",
                            "justify-content-center",
                            "align-items-center",
                            "h-100",
                            styles["select-team-text-container"]
                        )}
                    >
                        <div className="title">ROLE</div>
                    </div>
                    <div
                        className={clsx(
                            styles["input-container"],
                            "flex-grow-1"
                        )}
                    >
                        <CreatableSelect
                            isClearable
                            menuPlacement="auto"
                            styles={reactSelectStyle({ hide: !!item.roles })}
                            value={selectValue()}
                            onChange={onChange}
                            placeholder=""
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            options={rolesOptions}
                            onMenuClose={() => {
                                setSelectOpen(false);
                            }}
                            onMenuOpen={() => {
                                setSelectOpen(true);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
);
