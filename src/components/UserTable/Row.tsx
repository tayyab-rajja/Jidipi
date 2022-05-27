import React, { useState, useCallback } from "react";
import EditForm from "./EditForm";
import messages from "./messages";
import ExistingMembersForm from "./ExistingMembersForm";
import { ReactComponent as IconReturn } from "public/images/icons/icon-return.svg";
import EmptyCell from "./Cells/EmptyCell";
import styles from "src/components/UserTable/Table.module.scss";

export default function Row({
    item,
    tableData,
    selectedItem,
    setSelectedItem,
    onClick,
    team,
    index,
    onClear,
    calculatePositionOfStickyHeaders,
    getItems,
    createUpdateItem,
    items,
    setItems,
    targetRole,
    table,
    setInitalItemProps,
    innerRef,
}: any) {
    const [updating, setUpdating] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [openSelects, setOpenSelects] = useState<any[]>([]);
    const [formMargin, setFormMargin] = useState(0);

    const setSelectOpen = useCallback(
        (name) => {
            return (value: boolean) => {
                const index = openSelects.findIndex(
                    (select) => select.name === name
                );
                if (index !== -1) {
                    setOpenSelects((oldValue) => {
                        const select = oldValue[index];
                        select.isOpen = value;
                        oldValue[index] = select;
                        return [...oldValue];
                    });
                } else {
                    setOpenSelects((oldValue) => {
                        return [
                            ...oldValue,
                            {
                                name: name,
                                isOpen: true,
                            },
                        ];
                    });
                }
            };
        },
        [openSelects]
    );

    const targetSelectIsOpen = useCallback(
        (name) => {
            return () => {
                const targetSelect = openSelects.find(
                    (select) => select.name === name
                );
                return targetSelect?.isOpen;
            };
        },
        [openSelects]
    );

    const checkIfSelectOpen = useCallback(() => {
        if (!openSelects.length) {
            return false;
        }
        return openSelects.some((select) => select.isOpen === true);
    }, [openSelects]);

    const getCollapseClasses = () => {
        return `${styles["form-animation"]} ${
            selectedItem?._id === item._id
                ? styles["form-expand"]
                : styles["form-collapse"]
        }`;
    };

    const getClass = () => {
        // if (updating) {
        //   return 'updating';
        // }
        let updatedClass = "bg-gray4";
        if (!item.isActive) {
            updatedClass = "bg-soft-gray";
        }
        if (selectedItem && selectedItem._id === item._id) {
            updatedClass = deleteConfirm
                ? styles["active"]
                : updating
                ? styles["updating"]
                : // : selectedItem._id === 'new_user'
                // ? 'bg-white'
                selectedItem._id === "new_user" ||
                  selectedItem._id === "existing_user" ||
                  selectedItem.isExistingUser === true
                ? styles["bg-gray"]
                : styles["bg-black"];
        }
        return updatedClass;
    };

    const getHeight = () => {
        return (
            selectedItem &&
            selectedItem._id === item._id &&
            item._id === "existing_user" &&
            "bg-gray-height"
        );
    };

    const onCancel = useCallback((clear, id) => {
        console.log("run here.", clear);
        setSelectedItem(null);
        if (clear) {
            setTimeout(() => {
                onClear(id);
            }, 500);
        }
    }, []);

    const backToExistingUsersList = useCallback(() => {
        const id = "existing_user";
        const item = setInitalItemProps(id);
        items[index] = item;
        setSelectedItem(item);
        setItems([...items]);
    }, [items, index]);

    const centerizeForm = useCallback((formWidth) => {
        const tableWidth = table.current.offsetWidth;
        return (tableWidth - formWidth) / 2;
    }, []);

    const renderInput = (Cell: any, key: any, config: any, index: any) => {
        if (
            item._id === "initial_user" &&
            !(config.componentName === messages.TeamCell)
        ) {
            return (
                <EmptyCell
                    key={key}
                    calculatePositionOfStickyHeaders={
                        calculatePositionOfStickyHeaders
                    }
                    index={index}
                    config={config}
                ></EmptyCell>
            );
        }
        if (
            config.componentName === messages.AccessCell ||
            config.componentName === messages.StatusCell
        ) {
            return (
                <Cell
                    key={key}
                    item={item}
                    calculatePositionOfStickyHeaders={
                        calculatePositionOfStickyHeaders
                    }
                    config={config}
                    setUpdating={setUpdating}
                    setSelectedItem={setSelectedItem}
                    createUpdateItem={createUpdateItem}
                    getItems={getItems}
                    team={team}
                    index={index}
                    unEditable={tableData.unEditable}
                    {...config.componentProps}
                />
            );
        }
        if (config.componentName === messages.TeamCell) {
            return (
                <Cell
                    key={key}
                    calculatePositionOfStickyHeaders={
                        calculatePositionOfStickyHeaders
                    }
                    config={config}
                    team={team}
                    index={index}
                    {...config.componentProps}
                />
            );
        }

        return (
            <Cell
                key={key}
                item={item}
                calculatePositionOfStickyHeaders={
                    calculatePositionOfStickyHeaders
                }
                config={config}
                index={index}
                targetRole={targetRole}
                {...config.componentProps}
            />
        );
    };

    const renderList = () => {
        const keys = Object.keys(tableData.headers);
        return keys.map((key, i) => {
            const config = tableData.headers[key];
            const Cell = config.component;
            return renderInput(Cell, key + item._id, config, i);
        });
    };

    const renderForm = () => {
        if (selectedItem && selectedItem._id === item._id) {
            if (selectedItem._id === "existing_user") {
                return (
                    <ExistingMembersForm
                        setSelectedItem={setSelectedItem}
                        items={items}
                        targetRole={targetRole}
                        tableData={tableData}
                        setItems={setItems}
                        teamId={team._id}
                        centerizeForm={centerizeForm}
                    />
                );
            } else {
                return (
                    <EditForm
                        selectedItem={selectedItem}
                        deleteConfirm={deleteConfirm}
                        setDeleteConfirm={setDeleteConfirm}
                        setUpdating={setUpdating}
                        onRefresh={() => getItems()}
                        onCancel={onCancel}
                        setSelectOpen={setSelectOpen}
                        targetSelectIsOpen={targetSelectIsOpen}
                        createUpdateItem={createUpdateItem}
                        team={team}
                        tableData={tableData}
                        centerizeForm={centerizeForm}
                        setFormMargin={setFormMargin}
                        formMargin={formMargin}
                    />
                );
            }
        }
    };

    return (
        <>
            {item._id !== "existing_user" && !item.isExistingUser && (
                <tr
                    ref={innerRef}
                    key={item._id}
                    onClick={() =>
                        !tableData.unEditable &&
                        !(item._id === "initial_user") &&
                        item.isCompanyAdmin !== false &&
                        onClick(item)
                    }
                    className={`${getClass()}`}
                >
                    {renderList()}
                </tr>
            )}
            {selectedItem &&
                selectedItem._id === item._id &&
                selectedItem.isExistingUser === true && (
                    <tr className={`${getClass()} ${styles["return-tr"]}`}>
                        <td colSpan={11} className="p-0 align-middle">
                            <IconReturn
                                className="float-right"
                                style={{ marginRight: formMargin - 54 }}
                                onClick={backToExistingUsersList}
                            />
                        </td>
                    </tr>
                )}
            <tr className={styles["form-tr"]}>
                <td
                    colSpan={11}
                    className={`p-0 ${styles["form-td"]}`}
                    style={{
                        borderTop: `${
                            selectedItem && selectedItem._id === item._id
                                ? "1px solid #d6d6d6"
                                : 0
                        }`,
                    }}
                >
                    <div
                        className={`${getClass()} ${getHeight()} ${
                            styles["judge-form-row"]
                        } ${getCollapseClasses()} d-flex align-items-center justify-content-end`} //overflow-hidden
                        style={{
                            overflow: checkIfSelectOpen() ? "unset" : "hidden",
                        }}
                    >
                        {renderForm()}
                    </div>
                </td>
            </tr>
        </>
    );
}
