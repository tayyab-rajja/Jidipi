import React, { useState, useCallback, useContext, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { uploadUserLogo } from "src/utils/fetch";
import { formatFileSize } from "src/utils/common";
import ImageBlack from "public/images/common/image-black.svg";
import Search from "public/images/common/search.svg";
import Folder from "public/images/common/folder.svg";
import CloudImage from "public/images/file-upload/cloud.svg";
import CheckIcon from "public/images/actions/check.svg";
import ServerCategories from "./ServerCategories";
import useClickOutside from "src/hooks/useClickOutside";
import {FileType, retrySingleFile,  upload, UploadState} from "src/lib/file/action";
import {useDispatch } from "react-redux";



import styles from "./style.module.scss";
import { UserContext } from "src/providers/UserProvider";
import clsx from "clsx";
import Image from "next/image";

const FileUpload = ({
    type,
    typeKey,
    state,
    onSelect,
    onClose,
}: any) => {
    const dispatch = useDispatch();
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    user.authToken = userContext.token;
    const [preview, setPreview] = useState();
    const [selectedFile, setSelectedFile] = useState<any>();
    const [file, setFile] = useState();
    const [progress, setProgress] = useState(40);
    const [searchKey, setSearchKey] = useState("");
    const [filter, setFilter] = useState(1);

    const uploadContainer = useRef(null);
    useClickOutside(uploadContainer, () => {
        onClose();
    });

    const fileState = {
        Select: "SELECT",
        Uploading: "UPLOADING",
        Uploaded: "UPLOADED",
        Server: "SERVER",
    };

    const [currentSection, setCurrentSection] = useState(fileState.Select);
    // const logoState: UploadState = {
    //     files: [], type: FileType.LOGO, companyId: user.companyId
    // };

    // const uploadFile = async (file: any) => {
    //     const savedFile = await uploadUserLogo({
    //         file,
    //         authToken: user.authToken,
    //         type,
    //         userId: user._id,
    //     });

    //     setProgress(100);
    //     setCurrentSection(fileState.Uploaded);

    //     const json = await savedFile.json();
    //     const fileName = json.logo;

    //     setFile(fileName);
    //     onSelect(fileName);
    // };

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as any);
                onSelect(file, e.target?.result)
            };

            reader.readAsDataURL(file);
            setSelectedFile(file);
            setCurrentSection(fileState.Uploaded);
            dispatch(upload(state, acceptedFiles ));
            // uploadFile(file);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/png, image/svg+xml",
    });

    const renderDropzone = () => (
        <div
            className={clsx(
                styles["featured-img-uploaded"],
                styles["upload-modal"],
                "w-100"
            )}
        >
            <div
                className={clsx(
                    styles["uploaded-img"],
                    "d-flex",
                    "justify-content-center"
                )}
            >
                <div {...getRootProps()} className="w-100">
                    <input {...getInputProps()} />
                    <div className="d-flex justify-content-center align-items-center flex-column h-100">
                        <Image src={CloudImage} alt="" />
                        <p className="px-1 mt-2">
                            Drag and Drop or{" "}
                            <span className={styles["text-gold"]}>Browse</span>{" "}
                            to upload
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderUploading = () => (
        <div className={clsx("d-flex", "w-100", styles["uploading-section"])}>
            <div className={clsx(styles["left"], "d-flex", "w-100")}>
                <img
                    alt=""
                    src={preview || ""}
                    className="ml-2 mt-2"
                    height={90}
                    width={100}
                />
                <div
                    className={clsx(
                        "d-flex",
                        "flex-column",
                        styles["upload-area"],
                        "justify-content-center",
                        "ml-2"
                    )}
                >
                    <span>{selectedFile?.name}</span>
                    <span className={styles["text-light-gray"]}>
                        {formatFileSize(selectedFile?.size)}
                    </span>
                </div>
            </div>
            <div
                className={clsx(
                    styles["right"],
                    "w-100",
                    "d-flex",
                    "align-items-center"
                )}
            >
                <div
                    className={clsx(styles["progress-upload"], "mx-4", "w-100")}
                >
                    <div
                        style={{ width: `${progress}%` }}
                        className={styles["progress-inner"]}
                    ></div>
                </div>
            </div>
        </div>
    );

    const renderUploaded = () => (
        <div className={clsx("d-flex", "w-100", styles["uploading-section"])}>
            <div className={clsx(styles["left"], "d-flex", "w-100")}>
                <img
                    alt=""
                    src={preview || ""}
                    className="ml-2 mt-2"
                    height={90}
                    width={100}
                />
                <div
                    className={clsx(
                        "d-flex",
                        "flex-column",
                        "justify-content-center",
                        "ml-2",
                        styles["upload-area"]
                    )}
                >
                    <span>{selectedFile?.name}</span>
                    <span className={styles["text-light-gray"]}>
                        {formatFileSize(selectedFile?.size)}
                    </span>
                </div>
            </div>
            <div
                className={clsx(
                    styles["right"],
                    "w-100",
                    "d-flex",
                    "align-items-end",
                    "justify-content-end",
                    "pr-3",
                    "pb-3"
                )}
            >
                <img
                    aria-hidden
                    onClick={() => {
                        onSelect(file);
                    }}
                    alt=""
                    src={(CheckIcon as any).src}
                    className={ styles["pointer"]}
                />
            </div>
        </div>
    );

    const renderServerCategory = () => (
        <ServerCategories
            filter={filter}
            userDetails={user}
            onSelectLogo={(logo: any) => {
                onSelect(logo);
            }}
            type={type}
            typeKey={typeKey}
            searchKey={searchKey}
        />
    );

    const renderServer = () => (
        <div className={clsx(styles["gallery-search"], "w-100")}>
            <label className="d-flex">
                Select a logo from Server
                <ul className="d-flex ms-auto mr-0 p-0 mb-0">
                    <li>
                        <a
                            href="#test"
                            onClick={(e) => {
                                e.preventDefault();
                                setFilter(1);
                            }}
                            className={`${
                                filter === 1 ? styles["active"] : ""
                            }`}
                        >
                            1
                        </a>
                    </li>
                    <li>
                        <a
                            href="#test"
                            onClick={(e) => {
                                e.preventDefault();
                                setFilter(2);
                            }}
                            className={`${filter === 2 ? "active" : ""}`}
                        >
                            2
                        </a>
                    </li>
                    <li>
                        <a
                            href="#test"
                            onClick={(e) => {
                                e.preventDefault();
                                setFilter(3);
                            }}
                            className={`${filter === 3 ? "active" : ""}`}
                        >
                            3
                        </a>
                    </li>
                </ul>
            </label>
            <div className={styles["form-search"]}>
                <span>
                    <img src={(Search as any).src} alt="search icon" />
                </span>
                <input
                    type="search"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder="Search"
                />
            </div>
        </div>
    );

    const renderSection = () => {
        if (fileState.Select === currentSection) return renderDropzone();

        if (fileState.Uploading === currentSection) return renderUploading();

        if (fileState.Uploaded === currentSection) return renderUploaded();
        return renderServer();
    };

    return (
        <div className={styles["featured-img-popup"]}>
            <div className={styles["overlay"]}></div>

            <div
                className={clsx(
                    styles["box-popup"],
                    "d-flex",
                    "justify-content-center",
                    "align-items-center"
                )}
            >
                <div className={styles["content-popup"]} ref={uploadContainer}>
                    <div className="d-flex">
                        <div className={clsx(styles["tab-nav"], "tab-nav")}>
                            <ul
                                className={clsx(
                                    styles["nav"],
                                    styles["nav-pills"],
                                    "m-0",
                                    "nav-pills",
                                    "nav"
                                )}
                                id="pills-tab"
                                role="tablist"
                            >
                                <li
                                    className={clsx(
                                        styles["nav-item"],
                                        "nav-item"
                                    )}
                                >
                                    <a
                                        className={`${
                                            styles["nav-link"]
                                        } "nav-link" ${
                                            currentSection === fileState.Select
                                                ? styles["active"]
                                                : ""
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (
                                                currentSection ===
                                                fileState.Uploading
                                            )
                                                return;

                                            setCurrentSection(fileState.Select);
                                        }}
                                        data-toggle="pill"
                                        href="#test"
                                        role="tab"
                                        aria-controls="pills-upload-logo"
                                        aria-selected="true"
                                    >
                                        <span className="me-2">
                                            <Image src={ImageBlack} alt="" />{" "}
                                        </span>
                                        Upload Logo
                                    </a>
                                </li>
                                <li
                                    className={clsx(
                                        styles["nav-item"],
                                        "nav-item"
                                    )}
                                >
                                    <a
                                        className={`${styles["nav-link"]}  ${
                                            currentSection === fileState.Server
                                                ? styles["active"]
                                                : ""
                                        }`}
                                        data-toggle="pill"
                                        href="#test"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (
                                                currentSection ===
                                                fileState.Uploading
                                            )
                                                return;
                                            setCurrentSection(fileState.Server);
                                        }}
                                        role="tab"
                                        aria-controls="pills-select-logo"
                                        aria-selected="false"
                                    >
                                        <span className="me-2">
                                            <Image src={Folder} />
                                        </span>{" "}
                                        Select Logo
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div
                            className={styles["tab-content"]}
                            id="pills-tabContent"
                        >
                            <div
                                className={clsx(styles["tab-pane"], "d-flex")}
                                id="pills-upload-logo"
                                role="tabpanel"
                                aria-labelledby="pills-upload-logo-tab"
                            >
                                {renderSection()}
                            </div>
                        </div>
                    </div>
                    {currentSection === fileState.Server &&
                        renderServerCategory()}
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
