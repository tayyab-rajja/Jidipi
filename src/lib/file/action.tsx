export enum FileType {
    POST = 'POST',
    COMPANY = 'COMPANY',
    AVATAR = 'AVATAR',
    LOGO = 'LOGO',
}


export const UPLOAD = 'fileActions/UPLOAD';
export const UPLOAD_START = 'fileActions/UPLOAD_START';
export const UPLOAD_FAILED = 'fileActions/UPLOAD_FAILED';
export const GET_PRE_SIGNED_URL = 'fileActions/GET_PRE_SIGNED_URL';
export const GET_PRE_SIGNED_URL_SUCCESS = 'fileActions/GET_PRE_SIGNED_URL_SUCCESS';
export const GET_PRE_SIGNED_URL_FAILED = 'fileActions/GET_PRE_SIGNED_URL_FAILED';
// FOR single file
export const UPLOAD_TO_S3 = 'fileActions/UPLOAD_TO_S3';
export const UPLOAD_TO_S3_SUCCESS = 'fileActions/UPLOAD_TO_S3_SUCCESS';
export const UPLOAD_TO_S3_PROGRESS = 'fileActions/UPLOAD_TO_S3_PROGRESS';
export const UPLOAD_TO_S3_FAILED = 'fileActions/UPLOAD_TO_S3_FAILED';
// EOF FOR single file

export const UPLOADING = 'fileActions/UPLOADING';
export const UPLOAD_ALL_SUCCESS = 'fileActions/UPLOAD_ALL_SUCCESS';
export const UPLOAD_PROGRESS = 'fileActions/UPLOAD_PROGRESS';

export const RETRY_SINGE_FILE = 'fileActions/RETRY_SINGE_FILE';


/**
 * File Object
 */
export interface FileObject {
    name: string;
    size: string;
    type: string;
    localFile?: any,
    _id?: string;
    preSignedUrl?: string;
    liveURL?: string;
    progress?: number;
    success?: boolean;
    error?: any;
    retry?: number;
}

export enum UploadStatus {
    init = 'init',
    gettingPreSignedUrl = 'gettingPreSignedUrl',
    uploadFailed = 'uploadFailed',
    getPreSignedUrlSuccess = 'getPreSignedUrlSuccess',
    getPreSignedUrlFailed = 'getPreSignedUrlFailed',
    uploadingToS3 = 'uploadingToS3',
    uploadingToS3Success = 'uploadingToS3Success',
    uploadingToS3Failed = 'uploadingToS3Failed',
    allSuccess = 'allSuccess',
}

/**
 * User Model for State
 */
export interface UploadState {
    type: FileType,
    postId?: string,  // type = POST, upload files belong to a post,
    companyId?: string, // type = COMPANY, upload files belong to a company
    userId?: string, // type = AVATAR, upload user avatar
    logo?: string, // type = LOGO , upload logo for company
    folderId?: string, // type = POST | COMPANY, upload files to a folder.
    isChatFile?: boolean; // If it's a file uploaded in chat.
    files: FileObject[];
    error?: any; // get pre signed url error.
    status?: UploadStatus
}


export const upload = (detail: UploadState, e: any): { e: any; detail: UploadState; type: string } => ({
    type: UPLOAD,
    detail,
    e
})

export function uploadStart(detail: UploadState) {
    return {
        type: UPLOAD_START,
        detail,
    };
}

export function uploadFailed(detail: UploadState) {
    return {
        type: UPLOAD_FAILED,
        detail,
    };
}

export const getPreSignedUrl = (detail: UploadState): {
    type: string,
    detail: any,
} => ({
    type: GET_PRE_SIGNED_URL,
    detail
})

export const getPreSignedUrlSuccess = (detail: UploadState) => ({
    type: GET_PRE_SIGNED_URL_SUCCESS,
    detail,
})
export const getPreSignedUrlFailed = (message: string) => ({
    type: GET_PRE_SIGNED_URL_FAILED,
    message
})

/**
 * If signle file upload failed
 * @param file FileObject want to retry
 * @param type UploadType POST|COMPANY|AVATAR|LOGO
 */
export const retrySingleFile = (file: FileObject, type: string): {
    type: string,
    file: FileObject,
    detailType: string
} => ({
    type: UPLOAD_TO_S3,
    file, detailType:type
})
export const uploadToS3 = (file: FileObject, detailType: string): {
    type: string,
    file: FileObject,
    detailType: string
} => ({
    type: UPLOAD_TO_S3,
    file, detailType
})
export const uploadToS3Process = (_id: string, process: number): {
    type: string,
    detail: any,
} => ({
    type: UPLOAD_TO_S3_PROGRESS,
    detail: {_id, process}
})
export const uploadToS3Success = (_id: string, detailType: string): {
    type: string,
    detail: any,
} => {
    return {
        type: UPLOAD_TO_S3_SUCCESS,
        detail: {_id, detailType}
    }
}
// export const  uploadToS3Success = (file: FileObject): {
//     type: string,
//     file: FileObject,
// } => ({
//     type: UPLOAD_TO_S3_SUCCESS,
//     file
// })

export const uploadToS3Failed = (_id: string): {
    type: string,
    detail: any,
} => ({
    type: UPLOAD_TO_S3_FAILED,
    detail: {_id}
})

export const progress = (detail: UploadState): {
    type: string,
    detail: UploadState,
} => ({
    type: UPLOAD_PROGRESS,
    detail
})
