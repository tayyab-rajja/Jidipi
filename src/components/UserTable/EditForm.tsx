import React, { useEffect, useState, useCallback, useRef } from "react";
import AddIcon from "public/images/icons/add.svg";
import DeleteIcon from "public/images/icons/delete.svg";
import messages from "./messages";
import DeleteConfirm from "./DeleteConfirm";
import styles from "./Table.module.scss";
import clsx from "clsx";

export default ({
    onCancel,
    selectedItem,
    setUpdating,
    onRefresh,
    setDeleteConfirm,
    deleteConfirm,
    setSelectOpen,
    targetSelectIsOpen,
    createUpdateItem,
    team,
    tableData,
    centerizeForm,
    setFormMargin,
    formMargin,
}: any) => {
    const validations = tableData.validations;
    const userForm = useRef<any>();
    const [item, setItem] = useState(tableData.firstInitItemState(team));
    const [validationErrors, setValidationErrors] = useState(
        tableData.validationErrors
    );

    useEffect(() => {
        const margin = centerizeForm(userForm.current.offsetWidth);
        setFormMargin(margin);
        userForm.current.style.marginRight = margin + "px";
        setItem(tableData.resetOnSelectItem(selectedItem, team));
    }, [selectedItem]);

    const handleChange = useCallback((key, value) => {
        setItem((oldItem: any) => {
            const newItem = { ...oldItem };
            newItem[key] = value;
            return newItem;
        });
    }, []);

    const updateState = useCallback(() => {
        setTimeout(() => {
            setUpdating(false);
            onCancel();
            onRefresh();
        }, 2000);
    }, []);

    const onAddMember = async (event: any) => {
        if (event !== undefined && event.preventDefault) {
            event.preventDefault();
        }
        // const isValid = checkForValidation();

        // if (!isValid) return;
        const updatedItem = tableData.onAddMemberItemRemap(item, team);
        setUpdating(true);
        createUpdateItem(updatedItem);

        updateState();
    };

    const onDeleteMember = useCallback(
        (event) => {
            event.preventDefault();
            if (
                item._id &&
                item._id !== "new_user" &&
                item.isExistingUser !== true
            ) {
                setDeleteConfirm(true);
            } else {
                onCancel(true, item._id);
            }
        },
        [item._id, item.isExistingUser]
    );

    const confirmDeleteMember = () => {
        setUpdating(true);
        const fullObject = tableData.onConfirmDeleteMemberItemRemap(item, team);
        console.log(fullObject);
        setDeleteConfirm(false);
        setUpdating(true);
        createUpdateItem(fullObject);
        updateState();
    };

    const renderInput = (
        Input: any,
        key: any,
        i: any,
        keys: any,
        config: any,
        direction: any
    ) => {
        if (direction === messages.middle) {
            return (
                <Input
                    key={key}
                    item={item}
                    handleChange={handleChange}
                    {...config.componentProps}
                />
            );
        }
        if (config.type === messages.select) {
            return (
                <div
                    key={key}
                    className={`${i < keys.length - 1 ? "mb-3" : ""} ${
                        styles["input-box"]
                    } ${config.containerClassess || ""}`}
                >
                    <Input
                        item={item}
                        name={config.name}
                        handleChange={handleChange}
                        setSelectOpen={setSelectOpen}
                        targetSelectIsOpen={targetSelectIsOpen}
                        {...config.componentProps}
                    />
                </div>
            );
        }

        return (
            <div
                key={key}
                className={`${i < keys.length - 1 ? "mb-3" : ""} ${
                    styles["input-box"]
                } ${config.containerClassess || ""}`}
            >
                <Input
                    item={item}
                    handleChange={handleChange}
                    {...config.componentProps}
                />
            </div>
        );
    };

    const renderList = (direction: any) => {
        const targetObj = tableData.inputs[direction];
        const keys = Object.keys(targetObj);
        return keys.map((key, i) => {
            const config = targetObj[key];
            const Input = config.component;
            return renderInput(Input, key, i, keys, config, direction);
        });
    };
    return (
        <div>
            <div className="d-flex flex-column">
                <div
                    className={clsx(
                        "d-flex",
                        "justify-content-center",
                        "pt-4",
                        "pb-4",
                        styles["form-container"]
                    )}
                    ref={userForm}
                >
                    <div className="d-flex flex-column">
                        {renderList("right")}
                    </div>
                    {renderList("middle")}
                    <div className="d-flex flex-column position-relative">
                        {!deleteConfirm && (
                            <div
                                className={clsx(
                                    "add-cat-row",
                                    "position-absolute",
                                    styles["delete-action-button"]
                                )}
                                style={{ top: 6, right: -20 }}
                            >
                                <button
                                    type="button"
                                    onClick={onDeleteMember}
                                    className="btn-link position-absolute"
                                >
                                    <img src={DeleteIcon} alt="delete icon" />
                                    {/* <DeleteIcon /> */}
                                </button>
                            </div>
                        )}
                        <div
                            className={clsx(
                                "add-cat-row",
                                "position-absolute",
                                styles["add-action-button"]
                            )}
                        >
                            <button
                                type="button"
                                onClick={onAddMember}
                                className="btn-link position-absolute"
                            >
                                <img src={AddIcon} alt="add icon" />
                                {/* <AddIcon /> */}
                            </button>
                        </div>
                        {renderList("left")}
                    </div>
                </div>
                {deleteConfirm && (
                    <DeleteConfirm
                        formMargin={formMargin}
                        confirmDeleteMember={confirmDeleteMember}
                        setDeleteConfirm={setDeleteConfirm}
                    />
                )}
            </div>
        </div>
    );
};
