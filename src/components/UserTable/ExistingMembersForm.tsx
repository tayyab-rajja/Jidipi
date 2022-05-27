import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
// import DefaultUserAvatar from "assets/svgs/common/default-avatar.svg";
import DeleteIcon from "public/images/icons/delete.svg";
import styles from "./Table.module.scss";
import clsx from "clsx";

export default function ExistingMembersForm({
    setSelectedItem,
    items,
    setItems,
    tableData,
    targetRole,
    teamId,
    centerizeForm,
}: any) {
    // @ts-ignore
    const staff = useSelector((state) => state.team.staff);
    const existingUserForm = useRef<any>();
    const deleteButton = useRef<any>();
    const [selectedUser, setSelectedUser] = useState<any>(null);

    useEffect(() => {
        const margin = centerizeForm(existingUserForm.current.offsetWidth);
        existingUserForm.current.style.marginRight = margin + "px";
        deleteButton.current.style.right = margin + 23 + "px";
    }, []);

    const handleUserClick = useCallback(
        (user) => {
            setSelectedUser(user);
            setTimeout(() => {
                setSelectedUser(null);
                const index = items.findIndex(
                    (item: any) => item._id === "existing_user"
                );
                const existingUser = tableData.selectExistingUser(
                    targetRole._id,
                    user,
                    teamId
                );
                console.log(existingUser);
                items[index] = existingUser;
                console.log(items);
                setItems([...items]);
                setSelectedItem(existingUser);
            }, 1000);
        },
        [items]
    );

    const onCancel = useCallback(() => {
        setSelectedItem(null);
        const index = items.findIndex(
            (item: any) => item._id === "existing_user"
        );
        setTimeout(() => {
            setItems((value: any) => {
                value.splice(index, 1);
                return [...value];
            });
        }, 500);
    }, [items]);

    return (
        <div
            className={clsx("position-relative", styles["existing-user-form"])}
        >
            <div
                className={clsx(
                    styles["add-cat-row"],
                    "position-absolute",
                    styles["delete-action-button"]
                )}
                ref={deleteButton}
            >
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn-link position-absolute"
                >
                    <img src={DeleteIcon} alt="delete icon" />
                    {/* <DeleteIcon /> */}
                </button>
            </div>
            <div
                className={styles["existing-user-list"]}
                ref={existingUserForm}
            >
                {staff.map((user: any) => {
                    return (
                        <div
                            key={user._id}
                            className={`${styles["user-card"]} ${
                                selectedUser && user._id === selectedUser._id
                                    ? styles["user-card-active"]
                                    : ""
                            }`}
                            onClick={() => handleUserClick(user)}
                        >
                            <img
                                src={
                                    user.avatar ||
                                    "https://upload.jidipi.com/avatars/default.svg"
                                }
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                            {`${user.firstName} ${user.lastName}`}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
