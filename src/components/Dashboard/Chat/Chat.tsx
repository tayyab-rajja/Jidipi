import {io} from "socket.io-client";
import React, {useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import styles from "./Chat.module.scss";
import useSWR from "swr";
import {GET} from "../../../lib/common/api";
import UploadFile  from "../File/File";
import {FileType} from "../../../lib/file/action";

const cookies = new Cookies();
const WS_URL = process.env.WS_URL || "ws://localhost:3000";

export enum ChatType {
    PostChat = 'postChat',
    CompanyChat = 'companyChat',
    PartnerChat = 'partnerChat',
}

const Chat = (props: any) => {
    const [socket, setSocket] = useState<any>(null);

    const id = props.postId ?? props.companyId;
    const {data, error} = useSWR('/chat/' + id + '/' + props.chatType, GET);
    console.log(data, error);
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
            if(data && data._id){
                // @ts-ignore
                receivedMessages.push(data);
                setReceivedMessages(receivedMessages);
            }
        });
    }, [socket])


    const sendChatMessage = (messageText: string) => {
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
    const messages = receivedMessages.map((message: any, index: number) => {
        // const author = message.createdBy ;
        const author = message.userId.firstName + ' ' + message.userId.lastName;
        // return <span key={index} className={styles.message} data-author={author}>{message.data}</span>;
        return <div key={index}><span className={styles.message}> {author}: {message.message}</span></div>;

    });
    return <div className={styles.chatHolder}>
        <div className={styles.chatText}>
            {messages}
            <div ref={(element) => {
                messageEnd = element;
            }}></div>
        </div>
        <form onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
            ref={(element) => {
                inputBox = element;
            }}
            value={messageText}
            placeholder="Type a message..."
            onChange={e => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.textarea}
        >
        </textarea>
            <button type="submit" className={styles.button} onClick={handleChatEnd}>=</button>
            <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>Send</button>
            <UploadFile postId={id} type={FileType.POST}/>
        </form>
    </div>
}
export default Chat;