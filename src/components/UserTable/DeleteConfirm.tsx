import React from "react";
import CheckIcon from "public/images/icons/check.svg";
import styles from "./Table.module.scss";
import clsx from "clsx";

export default function DeleteConfirm({
    formMargin,
    confirmDeleteMember,
    setDeleteConfirm,
}: any) {
    return (
        <div
            className={clsx(
                "d-flex",
                "text-alert",
                "align-items-center",
                "justify-content-between",
                styles["delete-confirm"]
            )}
            style={{ marginRight: formMargin }}
        >
            <p className="mb-0">
                You want to delete this category with it translations for sure?
            </p>
            <div className="d-flex">
                <button
                    type="button"
                    className="me-2 cat-delete"
                    onClick={() => {
                        setDeleteConfirm(null);
                    }}
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="ms-auto cat-delete"
                    onClick={confirmDeleteMember}
                >
                    <img src={CheckIcon} alt="" className="me-2" />
                    Confirm
                </button>
            </div>
        </div>
    );
}
