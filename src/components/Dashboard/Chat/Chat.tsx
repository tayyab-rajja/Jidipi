import {io} from "socket.io-client";
import React, {useContext, useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import styles from "./Chat.module.scss";
import useSWR from "swr";
import {GET} from "../../../lib/common/api";
import UploadFile from "../File/File";
import {FileType} from "../../../lib/file/action";
import {CDN_URL} from "../../../lib/common/env";
import {UserContext} from "../../../providers/UserProvider";
import Message from "./Message";

const cookies = new Cookies();
const WS_URL = process.env.WS_URL || "ws://localhost:3000";

export enum ChatType {
    PostChat = 'postChat',
    CompanyChat = 'companyChat',
    PartnerChat = 'partnerChat',
}

const Chat = (props: any) => {
    // get user from context
    const userContext: any = useContext(UserContext);
    const user = userContext.user;

    const [showDragDrop, setShowDragDrop] = useState(false);
    const [socket, setSocket] = useState<any>(null);
    const id = props.postId ?? props.companyId;
    const {data, error} = useSWR('/chat/' + id + '/' + props.chatType, GET);
    console.log('fetch by useSWR', data, error);
    useEffect(() => {
        if (data && data.success && data.messages && data.messages.length > 0) {
            setReceivedMessages(data.messages);
        }
    }, [data]);

    let inputBox: HTMLTextAreaElement | null = null;
    let messageEnd = null;
    const [messageText, setMessageText] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);
    const messageTextIsEmpty = messageText.trim().length === 0;
    useEffect(() => {
        const query: any = {method: 'chat'};
        const token = cookies.get('token');
        if (token) {
            query.token = token;
        }
        if (!socket) {
            setSocket(io(WS_URL, {
                query: query
            }));
        }
    }, [])
    useEffect(() => {
        if (!socket) return;
        socket.emit('join-chat', {
            chatType: props.chatType,
            postId: props.postId ?? undefined,
            companyId: props.companyId ?? undefined,
        });
        socket.on('message', (data: any) => {
            console.log('received welcome-message >>', data)
            if (data && data._id) {
                // @ts-ignore
                receivedMessages.push(data);
                setReceivedMessages(receivedMessages);
            }
        });
    }, [socket])


    const sendChatMessage = (messageText: string) => {
        console.log('send chat message', messageText);
        if (!messageText || messageText.trim() === '') return;
        socket.emit('new-message', {
            chatType: props.chatType,
            message: messageText,
            postId: props.postId ?? undefined,
            companyId: props.companyId ?? undefined,
        });
        setMessageText("");
        if (inputBox) inputBox.focus();
    }
    const handleFormSubmission = (event: any) => {
        event.preventDefault();
        sendChatMessage(messageText);
    }
    const handleKeyPress = (event: any) => {
        if (event.charCode !== 13 || messageTextIsEmpty) {
            return;
        }
        sendChatMessage(messageText);
        event.preventDefault();
    }
    const handleChatEnd = (event: any) => {
        sendChatMessage('======');
    }

    // enum TABS=


    return (
        <div className={`${styles['widget']} ${styles['chat']}  d-flex flex-column flex-grow  `}>
            <div className={`${styles['widget-title']} `}>PARTNER</div>
            <div className={`row g-0 ${styles['buttons']} ${styles['top-buttons']}`}>
                <div className="col">
                    <button className={`${styles['panel']}`}>CHAT</button>
                </div>
                <div className="col">
                    <button className={`${styles['panel']} ${styles['tint']}`}>ACTIVITY</button>
                </div>
            </div>
            <div className={`${styles['chat-content']} flex-grow`}>
                <div className={`${styles['panel']}`}>
                    <div className={`${styles['widget-content']}`}>
                        <div className={`${styles['chat-wrapper']}`}>
                            <div className={`${styles['chat-placeholder']}`}>
                                If you have any questions about editing, please
                                leave a message here. Our colleagues will reply as
                                soon as possible.If you have any questions about
                                editing, please leave a message here. Our
                                colleagues will reply as soon as possible.
                            </div>
                            {receivedMessages.map((m: any, i: number) => (
                                <Message key={i} user={user} message={m}/>))}
                                <div className={`${styles['divider-line']}`}>
                                    <button onClick={(e)=>handleChatEnd(e)} className={`${styles['icon']}  ${styles['tint']} `}>
                                    <img src="/dashboard/chat/icon-line.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles['upload-wrapper']} ${showDragDrop ? '' : 'd-none'} d-flex align-items-center justify-content-center`}>
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
                    <input type="file"/>
                </div>
            </div>
            <div>{messageText}</div>
            <div className={`${styles['panel']} ${styles['bg-tint']}  ${styles['bottom-buttons']}  w-100`}>
                <div className={`${styles['chat-content']} d-flex w-100`}>
                    <button onClick={() => setShowDragDrop(!showDragDrop)}
                            className={`${styles['icon']} ${styles['white']}  ${showDragDrop ? styles['active'] : ''}    `}>
                        <img src="/dashboard/chat/icon-attachment.svg"/>
                    </button>
                    <input onChange={(e) => {
                        setMessageText(e.target.value);
                    }} onKeyPress={handleKeyPress} type="text"/>
                    <button onClick={(e) => {
                        handleFormSubmission(e);
                    }} disabled={messageTextIsEmpty} className={`${styles['icon']} ${styles['white']}  `}>
                        <img src="/dashboard/chat/icon-submit.svg"/>
                    </button>
                </div>
            </div>
        </div>
    );

}
export default Chat;