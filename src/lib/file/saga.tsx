
import {all, ForkEffect, put, takeEvery, takeLatest} from "@redux-saga/core/effects";
import {POST} from "../common/api";
import {getJsonFromLocalStorage, removeFromLocalStorage, storeLocally} from "../common/localStorage";
import Cookies from "js-cookie";
import {GlobalUser} from "../../providers/UserProvider";
import {
    GET_PRE_SIGNED_URL,
    getPreSignedUrl,
    getPreSignedUrlFailed,
    getPreSignedUrlSuccess,
    UPLOAD,
    UploadState
} from "./action";


function* getPreSignedUrlSaga(data: {
    type:string,
    detail: any,
}) {
    // const initUploadList: PreSignedUrlRequest = {
    //     type: props.type,
    //     postId: props.postId ?? undefined,
    //     companyId: props.companyId ?? undefined,
    //     files: [],
    //     isChatFile: props.isChatFile ?? false,
    // }
    // if (!e || !e.target || !e.target.files) return;
    // const fs: any[] = Array.from(e.target.files);
    // if(!fs) return ;
    // const uploadListWithoutLocalFile = {
    //     ...initUploadList,
    //     files: fs.map((file: any) => {
    //         return {
    //             name: file.name,
    //             size: file.size,
    //             type: file.type,
    //         }
    //     })
    // };
    // const uploadListWithLocalFile = {
    //     ...initUploadList,
    //     files: fs.map((file: any) => {
    //         return {
    //             name: file.name,
    //             size: file.size,
    //             type: file.type,
    //             localFile: file,
    //         }
    //     })
    // };
    try{

        const res:Response = yield POST("/file/getPreSignedUrl", {});
        if (res.status === 200) yield put(getPreSignedUrlSuccess())
        else  yield put(getPreSignedUrlFailed())
    }catch (e) {
        yield put(getPreSignedUrlFailed())
    }
}

function* uploadSaga(data: {
    type:string,
    detail: UploadState,
}) {
    // try {
    //
    //     if (res.user) yield put(signSuccess(res.user))
    // } catch (err: any) {
    //     yield put(signFailed(err))
    // }
}


export function* fileSaga(): Iterator<ForkEffect<never>> {
    yield takeEvery(GET_PRE_SIGNED_URL, getPreSignedUrlSaga);
    yield takeEvery(UPLOAD, uploadSaga);

}