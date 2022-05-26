import {
    FileObject,
    FileType,
    GET_PRE_SIGNED_URL,
    GET_PRE_SIGNED_URL_FAILED,
    GET_PRE_SIGNED_URL_SUCCESS,
    UPLOAD, UPLOAD_ALL_SUCCESS,
    UPLOAD_FAILED, UPLOAD_TO_S3_FAILED, UPLOAD_TO_S3_PROGRESS,
    UPLOAD_TO_S3_SUCCESS,
    uploadFailed,
    UploadState,
    UploadStatus
} from "./action";
import {HYDRATE} from "next-redux-wrapper";
import {AnyAction} from "redux";

export const initState: UploadState = {

    type: FileType.POST,
    files: [],
    error: null,
    status: UploadStatus.init,

};
export const fileReducer = (state = initState, action: AnyAction) => {
    switch (action.type) {
        // case HYDRATE:
        //     // // Attention! This will overwrite client state! Real apps should use proper reconciliation.
        //     // @ts-ignore
        //     return {...state.file, ...action.detail};

        case UPLOAD:
            console.log('upload reducer', action);
            return {...initState};
        case UPLOAD_FAILED:
            return {...state, status: uploadFailed};
        case GET_PRE_SIGNED_URL:
            // console.log(GET_PRE_SIGNED_URL, action.detail.files[0].name, action.detail.files[0].liveURL);
            return {
                ...state,
                files: [...(action.detail.files).map((file: any) => ({...file}))],
                // status: UploadStatus.gettingPreSignedUrl,
                status: UploadStatus.uploading,
                type: action.detail.type,
                isChatFile: action.detail.isChatFile,
                postId: action.detail.postId,
                companyId: action.detail.companyId,
                folderId: action.detail.folderId,
            }
        case GET_PRE_SIGNED_URL_SUCCESS:
            return {
                ...state,
                files: [...(action.detail.files).map((file: any) => ({...file}))],
                status: UploadStatus.getPreSignedUrlSuccess
            };
        case GET_PRE_SIGNED_URL_FAILED:
            return {...state, status: UploadStatus.getPreSignedUrlFailed};
        case UPLOAD_TO_S3_SUCCESS:
            let successCount = 0;
            let failedCount = 0;
            const files = state.files.map((f: FileObject) => {
                if (f._id === action.detail._id) {
                    f.success = true;
                }
                if (f.success) successCount++;
                else if(f.success=false) failedCount++;
                return {...f};
            })
            const total =files.length;
            let status = state.status;
            if (successCount === total) status = UploadStatus.allSuccess;
            else if(failedCount === total) status = UploadStatus.allFailed;
            else if(successCount + failedCount === total) status = UploadStatus.partialSuccess;
            return {...state, files, status};
        case UPLOAD_TO_S3_PROGRESS:
            return {
                ...state, files: state.files.map((f: FileObject) => {
                    if (f._id === action.detail._id) f.progress = action.detail.progress;
                    return {...f};
                })
            };
        case UPLOAD_TO_S3_FAILED:
            let successCount2 = 0;
            let failedCount2 = 0;
            const files2 = state.files.map((f: FileObject) => {
                if (f._id === action.detail._id) {
                    f.success = false;
                }
                if (f.success) successCount2++;
                else if(f.success=false) failedCount2++;
                return {...f};
            })
            const total2 =files2.length;
            let status2 = state.status;
            if (successCount2 === total2) status2 = UploadStatus.allSuccess;
            else if(failedCount2 === total2) status2 = UploadStatus.allFailed;
            else if(successCount2 + failedCount2 === total2) status2 = UploadStatus.partialSuccess;
            return {
                ...state, files: files2,status:status2
            };
        case UPLOAD_ALL_SUCCESS:
            return {...state, status: UploadStatus.allSuccess};
        default:
            return state;
    }
}


// // create a makeStore function
// const makeStore = () => createStore(fileReducer);
//
// // export an assembled wrapper
// export const fileWrapper = createWrapper(makeStore, {debug: true});