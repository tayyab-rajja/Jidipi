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
        prop,
        handleChange,
        setSelectOpen: setSelectOpenMainFunc,
        disabled,
    }: any) => {
        // @ts-ignore
        const sharedList = useSelector((state) => state.category.sharedList);
        const categoryOptions = useMemo(() => {
            return sharedList[0].categories.map((c: any) => {
                const category = c.categoryId;
                return {
                    label: category.title,
                    value: category._id,
                };
            });
        }, [sharedList]);
        const name = "groups";
        const setSelectOpen = setSelectOpenMainFunc(name);

        return (
            <div className={styles["input-container"]} style={style}>
                <div className="d-flex align-items-center box h-100">
                    <div
                        className={clsx(
                            "d-flex",
                            "justify-content-center",
                            "align-items-center",
                            "h-100",
                            styles["select-team-text-container"]
                        )}
                    >
                        <div className="title">GROUP</div>
                    </div>
                    <div className={ clsx(styles["input-container"], "flex-grow-1")}>
                        <CreatableSelect
                            isClearable
                            menuPlacement="auto"
                            styles={reactSelectStyle({ hide: !!item[prop] })}
                            value={categoryOptions.find(
                                (c: any) => c.value === item.companyGroup?._id
                            )}
                            onChange={(newValue) => {
                                if (newValue) {
                                    const { value, label } = newValue;
                                    handleChange("companyGroup", {
                                        _id: value,
                                        title: label,
                                    });
                                } else {
                                    handleChange("companyGroup", null);
                                }
                            }}
                            placeholder=""
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            options={categoryOptions}
                            onMenuClose={() => {
                                setSelectOpen(false);
                            }}
                            onMenuOpen={() => {
                                setSelectOpen(true);
                            }}
                            isDisabled={disabled}
                        />
                    </div>
                </div>
            </div>
        );
    }
);
