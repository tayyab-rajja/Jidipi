import {call, ForkEffect, put, take, takeEvery, takeLatest} from "@redux-saga/core/effects";
import {
    GET_PRE_SIGNED_URL,
    UPLOAD,
    UPLOAD_FAILED,
    uploadFailed,
    getPreSignedUrl,
    UploadState,
    uploadStart,
    getPreSignedUrlFailed,
    getPreSignedUrlSuccess,
    FileObject,
    GET_PRE_SIGNED_URL_SUCCESS,
    uploadToS3,
    UPLOAD_TO_S3,
    UPLOAD_TO_S3_SUCCESS,
    uploadToS3Success,
    uploadToS3Failed,
    UPLOAD_TO_S3_FAILED,
    UploadStatus, uploadToS3Process
} from "./action";
import {POST} from "../common/api";
import {CDN_URL} from "../common/env";
import axios from "axios";


function* uploadSaga(data: {
    type: string,
    detail: UploadState,
    e: any,
}) {
    const e = data.e;
    const props = data.detail;
    let fs: any[] = [];
    if (Array.isArray(e)) {
        fs = e
    } else {
        if (e && e.target && e.target.files) {
            fs = Array.from(e.target.files);
        }
    }
    const initUploadList: UploadState = {
        type: props.type,
        postId: props.postId ?? undefined,
        companyId: props.companyId ?? undefined,
        userId: props.userId ?? undefined,
        files: [],
        isChatFile: props.isChatFile ?? false,
    }
    if (fs.length < 1) {
        initUploadList.status = UploadStatus.uploadFailed;
        initUploadList.error = "Please select files";
        // Reducer return error
        yield put(uploadFailed(initUploadList));
        return;
    } else {
        const uploadListWithLocalFile = {
            ...initUploadList,
            files: fs.map((file: any) => {
                return {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    localFile: file,
                }
            })
        };
        // STEP 1: Get pre-signed url
        yield put(getPreSignedUrl(uploadListWithLocalFile))
    }
}

function* getPreSignedUrlSaga(data: {
    type: string,
    detail: UploadState,
}) {
    try {
        let fs = {
            ...data.detail, files: data.detail.files.map((f: FileObject) => {
                return {
                    name: f.name,
                    size: f.size,
                    type: f.type,
                }
            })
        };
        // @ts-ignore
        const r: any = yield POST("/file/getPreSignedUrl", fs);
        // STEP 2: Update upload list after getting pre-signed url
        if (r && r.success) {
            const fs = data.detail.files.map((p: FileObject) => {
                const file = r.files.find((f: any) => f.name === p.name);
                if (file) {
                    p.preSignedUrl = file.preSignedUrl;
                    p._id = file._id;
                    p.liveURL = file.liveURL ? file.liveURL : CDN_URL + '/' + file.key;
                }
                return p;
            });
            data.detail.files = fs;
            // Reducer update the per-signed-url
            yield put(getPreSignedUrlSuccess(data.detail));

        } else {
            // Reducer re-try 3 times, then return error.
            yield put(getPreSignedUrlFailed('get pre-signed url failed.'));
        }
    } catch (e) {
        yield put(getPreSignedUrlFailed('get pre-signed url failed.'));
    }
}

function* getPreSignedUrlSuccessSaga(data: {
    type: string,
    detail: UploadState,
}) {
    // Loop and upload the files one by one.
    if (data.detail.files.length)
        for (const file of data.detail.files) {
            yield put(uploadToS3(file, data.detail.type));
        }
}


function* uploadToS3Saga(data: {
    type: string,
    file: FileObject,
    detailType: string,
}) {
    const file = data.file;
    const _id = file._id ?? '';
    const url = file.preSignedUrl ?? '';

    /**
     * @description Handle upload progress
     * @param _id
     * @param progress
     * Used to display the progress bar
     */
    function onProgress(_id: any, progress: number) {
        console.log('onPress', _id, progress);
        put(uploadToS3Process(_id, progress))
    }

    try {
        const res: Response = yield axios.request({
            method: 'PUT',
            url,
            data: file.localFile,
            headers: {
                "Content-Type": file.type,
            },
            onUploadProgress: (e: any) => {
                const {loaded, total} = e;
                //Using local progress events
                if (e.lengthComputable) {
                    let progress = loaded / total * 100;
                    console.log(`${progress}% uploaded`);
                    if (e.loaded / e.total === 1) {
                        // onSuccess(_id);
                    } else {
                        // put(uploadToS3Process(_id,e.loaded / e.total))
                        onProgress(_id, e.loaded / e.total);
                    }
                }
            }
        });
    } catch (e) {
        // onError(_id, e);
        yield   put(uploadToS3Failed(_id));
    } finally {
        yield   put(uploadToS3Success(_id, data.detailType));
    }
    // console.log('data.file', data.file);
    // // @ts-ignore
    // const r:any = yield uploadFileToS3(data.file, onProgress, onSuccess, onError);
}

function* uploadToS3SuccessSaga(data: {
    type: string,
    detail: any,
}) {
    // file.uploadedAt = new Date();
    yield POST('/file/preSignedUrlUploadSuccess', {
        fileId: data.detail._id,
        type: data.detail.detailType,
        // isChatFile: file.isChatFile,
        // postId: file.postId,
        // companyId: file.companyId,
        // type: file.type,
    })

}


export function* fileSaga(): Iterator<ForkEffect<never>> {
    yield takeLatest(UPLOAD, uploadSaga);
    yield takeLatest(GET_PRE_SIGNED_URL, getPreSignedUrlSaga);
    yield takeLatest(GET_PRE_SIGNED_URL_SUCCESS, getPreSignedUrlSuccessSaga);
    yield takeLatest(UPLOAD_TO_S3, uploadToS3Saga);
    yield takeLatest(UPLOAD_TO_S3_SUCCESS, uploadToS3SuccessSaga);
    // yield takeEvery(UPLOAD_TO_S3_SUCCESS, uploadToS3Success);
    // yield takeEvery(UPLOAD_TO_S3_FAILED, uploadToS3Failed);

}