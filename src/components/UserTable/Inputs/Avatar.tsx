import React, { useState } from "react";
import FileUploadModal from "src/components/UploadFiles/FileUploadModal";
import AddIcon from "public/images/icons/add.svg";
import DeleteIcon from "public/images/icons/delete.svg";
import styles from "../Table.module.scss";
import clsx from "clsx";
// import Image from "next/image";

export default React.memo(({ item, handleChange }: any) => {
    const [selectLogo, setSelectLogo] = useState(false);
    const removeAvatar = (event: any) => {
        event.stopPropagation();
        handleChange("avatar", null);
        handleChange("logoId", null);
    };
    const onSelectFile = (file: any) => {
        handleChange("logoId", file._id);
        handleChange("avatar", file.liveURL);
        setTimeout(() => {
            // setSelectLogo(false);
        });
    };
    return (
        <>
            <div
                className={clsx(
                    styles["image-container"],
                    "d-flex",
                    "align-items-center",
                    "justify-content-center",
                    "bg-white",
                    "ms-3",
                    "me-3",
                    "pointer",
                    "position-relative",
                    "border-gray"
                )}
                onClick={() => setSelectLogo(true)}
            >
                {item.avatar && (
                    <div
                        className={clsx(
                            styles["delete-avatar-container"],
                            "position-absolute"
                        )}
                    >
                        <button
                            type="button"
                            onClick={removeAvatar}
                            className="btn-link position-absolute"
                        >
                            <img
                                src={(DeleteIcon as any).src}
                                alt="delete icon"
                            />
                            {/* <DeleteIcon /> */}
                        </button>
                    </div>
                )}
                <div className="add-cat-row">
                    {item.avatar ? (
                        <img
                            src={item.avatar}
                            alt={item.firstName}
                            className={styles["avatar-image"]}
                        />
                    ) : (
                        <button type="button" className="btn-link">
                            <img src={(AddIcon as any).src} alt="add icon" />
                            {/* <AddIcon /> */}
                            <div
                                className={clsx(
                                    "text-center",
                                    "mt-2",
                                    styles["add-avatar-text"]
                                )}
                            >
                                Avatar
                            </div>
                        </button>
                    )}
                </div>
                {selectLogo && (
                    <FileUploadModal
                        type="users"
                        typeKey="users"
                        onSelect={onSelectFile}
                        onClose={() => {
                            setSelectLogo(false);
                        }}
                    />
                )}
            </div>
        </>
    );
});
