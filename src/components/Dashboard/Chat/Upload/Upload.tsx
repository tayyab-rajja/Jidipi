import {useDropzone} from "react-dropzone";
import styles from "../Chat.module.scss";
import React, {useCallback} from "react";
import UploadIcon from "/public/dashboard/chat/icon-upload.svg";
import {FileType, upload, UploadState} from "../../../../lib/file/action";
import {useDispatch} from "react-redux";

export interface ChatUploadProps {
    postId?: string,  // type = POST, upload files belong to a post,
    companyId?: string, // type = COMPANY, upload files belong to a company
    folderId?: string, // type = POST | COMPANY, upload files to a folder.
    onSelectedFiles: any,
}

export const Upload = (props: ChatUploadProps) => {
    const dispatch = useDispatch();
    const state: UploadState = {
        files: [],
        type: props.postId ? FileType.POST : FileType.FOLDER,
        isChatFile: true
    };
    if (props.postId) state.postId = props.postId;
    if (props.companyId) state.companyId = props.companyId;
    if (props.folderId) state.folderId = props.folderId;
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            dispatch(upload(state, acceptedFiles));
            props.onSelectedFiles(acceptedFiles);
        }
    }, []);
    const {getRootProps, getInputProps} = useDropzone({onDrop});
    return (
        <div
            className={`${styles['upload-wrapper']} d-flex align-items-center justify-content-center`} {...getRootProps()}>
            <div className={`${styles['upload-placeholder']}`}>
                <div className={`${styles['icon']} mb-2`}>
                    <img src="/dashboard/chat/icon-upload.svg" alt="upload"/>
                </div>
                <br/>
                Drag and Drop or
                <br/>
                <a className={`${styles['color-hover']} ${styles['toggle']}`}>Browse</a>
                to upload
            </div>
            <input {...getInputProps()} />
        </div>
    );
}