import {io} from "socket.io-client";
import React, {useContext, useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import styles from "./Chat.module.scss";
import useSWR from "swr";
import {GET} from "../../../lib/common/api";
import {UserContext} from "../../../providers/UserProvider";
import Message from "./Message";
import {Upload} from "./Upload/Upload";
import {FileObject, FileType, UPLOAD_TO_S3_SUCCESS, UploadStatus} from "../../../lib/file/action";
import {useSelector} from "react-redux";

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

    // const files = useSelector((state:any) => state.file.files);
    // const status = useSelector((state:any) => state.file.status);
    const files = useSelector((state: any) => state.file);

    const [showDragDrop, setShowDragDrop] = useState(false);
    const [socket, setSocket] = useState<any>(null);
    const id = props.postId ?? props.companyId;
    const {data, error} = useSWR('/chat/' + id + '/' + props.chatType, GET);
    // console.log('fetch by useSWR', data, error);
    useEffect(() => {
        if (data && data.success && data.messages && data.messages.length > 0) {
            const ms: any = [...receivedMessages];
            const existIds = receivedMessages.map((m: any) => m._id).filter((id: any) => !!id);
            data.messages.forEach((m: any) => {
                if (!existIds.includes(m._id)) {
                    ms.push(m);
                }
            });
            setReceivedMessages(ms);
        }
    }, [data]);


    useEffect(() => {
        // Not chat file
        if (!files.isChatFile) return;
        //Not same post or company or folder,
        if (props.postId && files.postId !== props.postId) return;
        if (props.companyId && files.companyId !== props.companyId) return;
        if (props.folderId && files.folderId !== props.folderId) return;
        console.log("uploading?????????????", files.status, files.files.length);
        console.log("receivedMessages", receivedMessages);

        // create messages
        // if (files.status === UploadStatus.uploading || files.status === UploadStatus.allSuccess) {
        // When upload the file, add it into messages.
        // const ms: any = receivedMessages;
        files.files.forEach((file: FileObject) => {
            if (files.status === UploadStatus.uploading) {
                receivedMessages.push({
                    chatType: props.chatType,
                    isFile: true,
                    postId: props.postId ?? undefined,
                    companyId: props.companyId ?? undefined,
                    folderId: props.folderId ?? undefined,
                    message: '',
                    file: {...file, localFile: null},
                });
            } else if (files.status === UploadStatus.getPreSignedUrlSuccess) {

            } else {
                const existingMessage: any = receivedMessages.find((message: any) => {
                    return message.file && message.file._id === file._id;
                });
                console.log('existingMessage', existingMessage);

                existingMessage.file = file;
                if (file.success) {
                    console.log("SUCCESS, send out file", file);
                    sendChatMessage('', file._id);
                }
            }
        });
        setReceivedMessages([...receivedMessages]);
        // }

    }, [files]);


    let inputBox: HTMLTextAreaElement | null = null;
    let messageEnd = null;
    const [messageText, setMessageText] = useState("");
    const [receivedMessages, setReceivedMessages] = useState<any[]>([]);
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
            console.log('receive message on socket: ', data, receivedMessages.length, receivedMessages);
            if (data && data._id) {
                if (data.isFile) {
                    const existingMessage: any = receivedMessages.find((message: any) => {
                        return message.file && message.file._id === data._id;
                    });
                    if (existingMessage) {
                        existingMessage._id = data._id;
                    }
                }
                receivedMessages.push(data);
                console.log('receive message on socket22222: ', receivedMessages.length, receivedMessages);
                setReceivedMessages([...receivedMessages]);
            }
        });
    }, [socket])


    const sendChatMessage = (messageText: string, fileId: string = '') => {
        console.log('send chat message', messageText);
        if ((!messageText || messageText.trim() === '') && !fileId) return;
        socket.emit('new-message', {
            chatType: props.chatType,
            message: messageText,
            postId: props.postId ?? undefined,
            companyId: props.companyId ?? undefined,
            folderId: props.folderId ?? undefined,
            isFile: !!fileId,
            file: fileId ?? undefined,
        });
        if (!fileId) {
            setMessageText("");
            if (inputBox) inputBox.focus();
        }
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
                            {receivedMessages.length === 0 &&
                                <div className={`${styles['chat-placeholder']}`}>
                                    If you have any questions about editing, please
                                    leave a message here. Our colleagues will reply as
                                    soon as possible.If you have any questions about
                                    editing, please leave a message here. Our
                                    colleagues will reply as soon as possible.
                                </div>
                            }
                            {receivedMessages.map((m: any, i: number) => (
                                <Message key={i} user={user} message={m}/>))}
                            <div className={`${styles['divider-line']}`}>
                                <button onClick={(e) => handleChatEnd(e)}
                                        className={`${styles['icon']}  ${styles['tint']} `}>
                                    <img src="/dashboard/chat/icon-line.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {showDragDrop &&
                    <Upload postId={props.postId} companyId={props.companyId} onSelectedFiles={
                        () => {
                            setShowDragDrop(false);
                        }
                    }/>}
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