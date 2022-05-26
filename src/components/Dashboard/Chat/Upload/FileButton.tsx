import styles from "../Chat.module.scss";
import React, {FormEventHandler} from "react";
import {Callback} from "i18next";

export enum FileButtonActions {
    CLOSE = 'close',
    SUCCESS = 'success',
    DOWNLOAD = 'download',
    PAUSE = 'pause',

}
export interface FileButtonProps {
    action: FileButtonActions,
    onSubmit?: any,
}
 const FileButton = (props:FileButtonProps) => {
    return <button onClick={()=>props.onSubmit()} className={`${styles['icon']} ${styles['divider']} sm ${styles[props.action]}`}>
        <img src={"/dashboard/chat/icon-"+props.action+".svg"} alt={props.action}/>
    </button>
}
export default FileButton;