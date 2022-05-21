import styles from "./Chat.module.scss";
import {CDN_URL} from "../../../lib/common/env";
import React from "react";
import moment from "moment";

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


    function content(){
        if(!message.isFile)
        return  ( <div className={`${styles['text']}`}>{message.message}</div>);

        return (  <div className={`${styles['text']} ${styles['upload']} ${styles['state-uploading']}  `}>
            <div className={`${styles['upload-process']}`} ></div>
            <div className={`${styles['icon']}`}>
                <img src="/dashboard/chat/icon-pdf.svg"/>
            </div>
            <div className={`${styles['description']}`}>
                <div className={`${styles['title']}`}>Catalogues 2021</div>
                <div className={`${styles['status']}`}>0.5 MB - Uploading</div>
            </div>

            <div className={`d-flex align-items-center ${styles['controls']}`} >
                <button className={` ${styles['icon']} ${styles['divider']} ${styles['pause']}`} >
                    <img src="/dashboard/chat/icon-pause.svg"/>
                </button>
                {/*<button className="icon divider sm arrow">*/}
                {/*    <img src="/dashboard/chat/icon-arrow.svg"/>*/}
                {/*</button>*/}
                {/*<button className="icon divider sm close">*/}
                {/*    <img src="/dashboard/chat/icon-close.svg"/>*/}
                {/*</button>*/}
                {/*<div className="icon sm success">*/}
                {/*    <img src="/dashboard/chat/icon-success.svg"/>*/}
                {/*</div>*/}
                {/*<button className="icon transparent sm download">*/}
                {/*    <img*/}
                {/*        src="/dashboard/chat/icon-download.svg"*/}
                {/*    />*/}
                {/*</button>*/}
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