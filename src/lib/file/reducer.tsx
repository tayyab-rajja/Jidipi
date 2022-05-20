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
            return {...initState};
        case UPLOAD_FAILED:
            return {...state, status: uploadFailed};
        case GET_PRE_SIGNED_URL:
            // console.log(GET_PRE_SIGNED_URL, action.detail.files[0].name, action.detail.files[0].liveURL);
            return {...state, files: [...(action.detail.files).map((file: any) => ({...file}))], status: UploadStatus.gettingPreSignedUrl}
        case GET_PRE_SIGNED_URL_SUCCESS:
            return {...state, files: [...(action.detail.files).map((file: any) => ({...file}))], status: UploadStatus.getPreSignedUrlSuccess};
        case GET_PRE_SIGNED_URL_FAILED:
            return {...state, status: UploadStatus.getPreSignedUrlFailed};
        case UPLOAD_TO_S3_SUCCESS:
            let allSuccess=true;
            const files = state.files.map((f:FileObject)=>{
                if(f._id === action.detail._id){
                    f.success=true;
                }
                if(!f.success) allSuccess=false;
                return { ...f };
            })
            let status = state.status;
            if(allSuccess){
                status = UploadStatus.allSuccess;
            }
            return {...state, files, status};
        case UPLOAD_TO_S3_PROGRESS:
            return {...state, files: state.files.map((f:FileObject)=>{
                    if(f._id === action.detail._id) f.progress=action.detail.progress;
                    return { ...f };
                })};
        case UPLOAD_TO_S3_FAILED:
            return {...state, files: state.files.map((f:FileObject)=>{
                    if(f._id === action.detail._id)      f.success= false;
                    return { ...f };
                })};
        case UPLOAD_ALL_SUCCESS:
            return {...state,  status:UploadStatus.allSuccess};
        default:
            return state;
    }
}


// // create a makeStore function
// const makeStore = () => createStore(fileReducer);
//
// // export an assembled wrapper
// export const fileWrapper = createWrapper(makeStore, {debug: true});