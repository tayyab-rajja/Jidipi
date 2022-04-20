import { io } from "socket.io-client";
import {processEnv} from "@next/env";
const WS_URL =  process.env.WS_URL || "ws://localhost:3000";
const Chat = (props: any) => {
    const socket = io(WS_URL);
    // IMPORTANT! By default, socket.io() connects to the host that
// served the page, so we dont have to pass the server url
//     var socket = io.connect()

//prompt to ask user's name
    const username = prompt('Welcome! Please enter your name:')

// emit event to server with the user's name
    socket.emit('chat', { type:'connection', username: username,postId:'pppid',companyId:'cid' });

// captures welcome-message event from the server
    socket.on('welcome-message', (data) => {
        console.log('received welcome-message >>', data)
    })
    return <div>
        Chat
    </div>
}