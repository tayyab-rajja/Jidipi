import {useDropzone} from "react-dropzone";
import styles from "../CloudContent/AddModal/Modal.module.css";
import React from "react";

export const Upload = (props: any) => {
    const { getRootProps, getInputProps } = useDropzone();
    if(!props.show) return <></>;

    return (
        <div  className={`${styles['upload-wrapper']} d-flex align-items-center justify-content-center`} {...getRootProps()}>
            <div className={`${styles['upload-placeholder']}`}>
                <div className={`${styles['icon']} mb-2`}>
                    <img src="/dashboard/chat/icon-upload.svg"/>
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