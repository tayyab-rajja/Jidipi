import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { reactSelectStyle } from "src/utils/styles";
import styles from "../Table.module.scss";
import clsx from "clsx";
const style = { height: 44 };
export default React.memo(
    ({
        item,
        handleChange,
        setSelectOpen: setSelectOpenMainFunc,
        isDisabled,
    }: any) => {
        // @ts-ignore
        let roles = useSelector((state) => state.roles.roles);
        const rolesOptions = useMemo(() => {
            return roles.map((role: any) => ({
                label: role.title,
                value: role._id,
            }));
        }, [roles]);

        const name = "roles";
        const setSelectOpen = setSelectOpenMainFunc(name);

        return (
            <div className={styles["input-container"]} style={style}>
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
                        <div className="title">ROLES</div>
                    </div>
                    <div
                        className={clsx(
                            styles["input-container"],
                            "flex-grow-1"
                        )}
                    >
                        <CreatableSelect
                            isMulti
                            isClearable
                            menuPlacement="top"
                            isDisabled={isDisabled}
                            styles={reactSelectStyle({ hide: !!item.roles })}
                            value={rolesOptions.filter((t: any) =>
                                item.roles.some((r: any) => r === t.value)
                            )}
                            onChange={(newValue) => {
                                console.log(newValue);
                                if (newValue?.length) {
                                    const result = newValue.map((v) => v.value);
                                    console.log(result);
                                    handleChange("roles", result);
                                } else {
                                    handleChange("roles", []);
                                }
                            }}
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
