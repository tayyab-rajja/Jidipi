import socketIOClient from 'socket.io-client';
export const BASE_SOCKET_URL =   process.env.BASE_SOCKET_URL || 'https://api-dev.dev.jidipi.com';

// const connectSocket = () => {
//     // const socket = socketIOClient(BASE_SOCKET_URL, {
//     //   transports: ['websocket'],}) ;
//     // socketIOClient(BASE_SOCKET_URL, {
//     //   transports: ['websocket'],
//     // });
//
//     const socket = window.fitSwarmWebsocket
//         ? window.fitSwarmWebsocket
//         : (window.fitSwarmWebsocket = socketIOClient(BASE_SOCKET_URL, {
//             transports: ['websocket'],
//         }));
//     return socket;
// };
//
// const socket = connectSocket();
// export { connectSocket,socket};
//
// export function emitJoinPost(postId){
//     if(postId){
//         socket.emit('join', { _id: postId, type: 'post',  isEditing: true, at:Date.now() });
//     }
// }
// export function emitLeavePost(postId){
//     if(postId){
//         socket.emit('leave', { _id: postId, type: 'post',  isEditing: false, at:Date.now() });
//     }
// }
// export function emitPostStatus(postId,status){
//     socket.emit('status', { _id: postId, type: 'post', status, at:Date.now()  });
// }
//
// export function emitJoinCompany(companyId){
//     if(companyId){
//         socket.emit('join', { _id: companyId, type: 'company',  isEditing: true, at:Date.now() });
//     }
// }
// export function emitLeaveCompany(companyId){
//     if(companyId){
//         socket.emit('leave', { _id: companyId, type: 'company',  isEditing: false, at:Date.now() });
//     }
// }
// export function emitCompanyStatus(companyId,status){
//     socket.emit('status', { _id: companyId, type: 'company', status, at:Date.now()  });
// }