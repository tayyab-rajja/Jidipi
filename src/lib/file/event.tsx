
// export function uploadFile(file:FileObject,onProgress : any) {
//     const _id = file._id ?? '';
//     const url = file.preSignedUrl ?? '';
//    return axios.request({
//         method: 'PUT',
//         url,
//         data: file.localFile,
//         headers:{
//             "Content-Type": file.type,
//         },
//        onUploadProgress: onProgress
//     }).then(response => response)
//        .catch(error => error);
// }
// let emit: any;
// const chan = eventChannel(emitter => {
//     emit = emitter;
//     return () => {}
// });
//
// const uploadPromise = uploadFile(file, (progressEvent: any) => {
//     let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//     emit(percentCompleted);
//     if(percentCompleted==100)
//         emit(END);
//     else
//         emit(percentCompleted);
// });
//
// function* watchOnProgress(chan: any) {
//     while (true) {
//         // @ts-ignore
//         const data :any  = yield take(chan);
//         console.log(data);
//         // yield put(setProgress({progress:data}));
//     }
// }

import {FileObject, upload} from "./action";
import {END} from "@redux-saga/types";
import {take} from "@redux-saga/core/effects";


// import eventEmitter from './emitter';


// export function createUploader(payload:FileObject) {
//
//     let emit: any;
//     const chan = eventEmitter((emitter: any) => {
//         emit = emitter;
//         return () => {}; // it's necessarily. event channel should
//                          // return unsubscribe function. In our case
//                          // it's empty function
//     });
//
//     const uploadPromise = upload(payload, (event) => {
//         if (event.loaded.total === 1) {
//             emit(END);
//         }
//
//         emit(event.loaded.total);
//     });
//
//     return [ uploadPromise, chan ];
// }
//
// export function* watchOnProgress(chan:any) {
//     while (true) {
//         // @ts-ignore
//         const data = yield take(chan);
//         // yield put(uploadToS3Process(_id:data,process))
//         // yield put({ type: 'PROGRESS', payload: data });
//     }
// }
//
// function eventEmitter(arg0: (emitter: any) => () => void) {
//     throw new Error("Function not implemented.");
// }
















// import eventEmitter from './emitter';
// import {promise} from "@redux-saga/is";
// import {AnyAction} from "redux";
// import {Any} from "typescript-compare";
// import { fork } from "node:child_process";
//
//
// function uploadEmitter(data: AnyAction) {
//     const file = data.file;
//     const _id = file._id ?? '';
//     const url = file.preSignedUrl ?? '';
//
//     // return eventChannel((emit) => {
//     //     const tick = () => emit('NEXT_TICK');
//     //     // start a timer
//     //     const timerId = setInterval(tick, interval);
//     //     // return an unsubscribe function
//     //     return () => {
//     //         clearInterval(timerId);
//     //     };
//     // })
//
//     return eventChannel(  (emit) => {
//         axios.request({
//             method: 'PUT',
//             url,
//             data: file.localFile,
//             headers: {
//                 "Content-Type": file.type,
//             },
//             onUploadProgress: (e: any) => {
//                 emit(e);
//             }
//         }).then(() => {
//         });
//
//         return () => {
//         }
//
//     });
// }
//
// function* progressListener(chan: any) {
//     while (true) {
//         // @ts-ignore
//         const data = yield take(chan);
//         console.log('progressListener', data);
//         // yield put({type: 'PROGRESS', payload: data})
//     }
// }
//
// function* uploadToS3Saga(data: AnyAction) {
//     const emitter = uploadEmitter(data)
//
//     yield fork(progressListener, emitter)
//     // const result = yield call(identity(promise))
//     // yield put({type: 'SUCCESS', payload: result})
// }
//
// function* uploadToS3Saga123(data: {
//     type: string,
//     file: FileObject,
// }) {
//     const file = data.file;
//     const _id = file._id ?? '';
//     const url = file.preSignedUrl ?? '';
//
//     try {
//         const res: Response = yield axios.request({
//             method: 'PUT',
//             url,
//             data: file.localFile,
//             headers: {
//                 "Content-Type": file.type,
//             },
//             onUploadProgress: (e: any) => {
//                 eventEmitter.emit(
//                     "UPLOAD_PROGRESS",
//                     Math.floor(100 * (e.loaded / e.total))
//                 );
//             }
//         });
//     } catch (e) {
//         // onError(_id, e);
//         yield   put(uploadToS3Failed(_id));
//     } finally {
//         yield   put(uploadToS3Success(_id));
//     }
//     // console.log('data.file', data.file);
//     // // @ts-ignore
//     // const r:any = yield uploadFileToS3(data.file, onProgress, onSuccess, onError);
// }