import styles from "./Chat.module.scss";
import {CDN_URL} from "../../../lib/common/env";
import React from "react";
import moment from "moment";
import {formatBytes} from "../../../lib/file/size";
import FileButton, {FileButtonActions} from "./Upload/FileButton";

export interface MessageProps {
    message: any,
    user: any,
    // isSelf: boolean,
    // createdAt?: Date,
    // text: string,
}

const Message = (props: MessageProps) => {
    // const self = props.user;
    // const userId = props.userId;
    // const isSelf = self._id === userId._id;
    // const user =  props.userId?? props.user;

    const message = props.message;
    let user = message.userId;
    if (!user) {
        user = props.user;
    }

    const isSelf = !message.userId || message.userId._id === props.user._id;

    // console.log(message);
    if (message.message.includes('======')) return <div
        className={`${styles['divider-line']} ${styles['active']}`}></div>

    const file = message.file;
    let uploadStatus = '';
    if (message._id) {
    } else if (file) {
        if (file.success) {
            uploadStatus = '- Successfully';
        } else if (file.success === false) {
            uploadStatus = '- Failed';
        } else {
            uploadStatus = '- Uploading';
        }
    }

    function content() {
        if (!message.isFile)
            return (<div className={`${styles['text']}`}>{message.message}</div>);

        return (<div className={`${styles['text']} ${styles['upload']} ${styles['state-uploading']}  `}>
            <div className={`${styles['upload-process']}`}></div>
            <div className={`${styles['icon']}`}>
                <img src="/dashboard/chat/icon-pdf.svg"/>
            </div>
            <div className={`${styles['description']}`}>
                <div className={`${styles['title']}`}>{file.name}</div>
                <div className={`${styles['status']}`}>{formatBytes(file.size)} {uploadStatus}</div>
            </div>

            <div className={`d-flex align-items-center ${styles['controls']}`}>
                {!message._id && !file.success && <>  <FileButton action={FileButtonActions.CLOSE}/>   </>}
                {!message._id && file.success && <FileButton action={FileButtonActions.SUCCESS}/>}
                {message._id && file._id && <FileButton
                    action={FileButtonActions.DOWNLOAD}
                    onSubmit={() => {
                        window.open(`${file.liveURL}`);
                    }}
                />}
            </div>
        </div>);
    }

    return (
        <div className={`${styles['chat-message']} ${isSelf ? styles['self'] : ''}`}>
            <div className={`${styles['header']}`}>
                <div className={`${styles['icon']}`}>
                    <img src={user && user.avatar ? user.avatar : CDN_URL + '/avatars/default.svg'}/>
                </div>
                <div className={`${styles['description']}`}>
                    {moment(message.createdAt).format('YYYY-MM-DD HH:MM')}
                    <br/>
                    {user.uniqueId} - {(user.firstName + ' ' + user.lastName).trim()}
                </div>
            </div>
            {content()}
        </div>
    );
}
export default Message;