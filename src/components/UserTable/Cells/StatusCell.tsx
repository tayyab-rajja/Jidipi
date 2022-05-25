import clsx from "clsx";
import React, { useState, useEffect } from "react";
import styles from "../Table.module.scss";

export default ({
    item,
    calculatePositionOfStickyHeaders,
    config,
    setUpdating,
    setSelectedItem,
    createUpdateItem,
    getItems,
    activeName,
    unActiveName,
    team,
    index,
    unEditable,
}: any) => {
    const [checked, setChecked] = useState(item.isActive);

    useEffect(() => {
        setChecked(item.isActive);
    }, [item.isActive]);

    const updateStatusDB = (value: any) => {
        let updatedItem;
        if (unEditable) {
            updatedItem = {
                isActive: value,
            };
            createUpdateItem(updatedItem, item._id);
        } else {
            updatedItem = {
                teamId: item.teamId || team._id,
                userId: item._id,
                isActive: value,
            };
            createUpdateItem(updatedItem);
        }
        setUpdating(true);
        setTimeout(() => {
            getItems();
            setUpdating(false);
        }, 1000);
    };

    const onChange = (event: any) => {
        const result = event.target.checked;
        setChecked(result);
        if (item._id !== "new_user") {
            updateStatusDB(result);
        } else {
            setSelectedItem((value: any) => {
                return {
                    ...value,
                    isActive: result,
                };
            });
        }
    };

    return (
        <td
            className={`text-right ${index === 0 ? styles["first-cell"] : ""}`}
            style={calculatePositionOfStickyHeaders(config)}
        >
            <span className="mr-2">{checked ? activeName : unActiveName}</span>
            <label className={clsx(styles["switch"], "m-0", "mr-3")}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                ></input>
                <span
                    className={clsx(styles["slider"], styles["round"])}
                ></span>
            </label>
        </td>
    );
};
