import {Action} from 'redux'
import {ErrorAction} from "../common/action";
import {SIGNIN_FAILED, SIGNIN_SUCCESS, User, UserAction} from "../user/action";

export const GET_PRE_SIGNED_URL = 'fileActions/GET_PRE_SIGNED_URL';
export const GET_PRE_SIGNED_URL_SUCCESS = 'fileActions/GET_PRE_SIGNED_URL_SUCCESS';
export const GET_PRE_SIGNED_URL_FAILED = 'fileActions/GET_PRE_SIGNED_URL_FAILED';
export const UPLOAD = 'fileActions/UPLOAD';
export const UPLOAD_ALL_SUCCESS = 'fileActions/UPLOAD_ALL_SUCCESS';
export const UPLOAD_FAILED = 'fileActions/UPLOAD_FAILED';
export const UPLOAD_PROGRESS = 'fileActions/UPLOAD_PROGRESS';


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
    progress?: number;
    success?: boolean;
    error?: any;
    retry?: number;
}


/**
 * User Model for State
 */
export interface UploadState {
    type: 'POST' | 'COMPANY';
    postId: string | undefined;
    companyId: string | undefined;
    isChatFile: boolean;
    files: FileObject[];
    allSuccess?: boolean;
}


export const getPreSignedUrl = (detail: any): {
    type: string,
    detail: any,
} => ({
    type:GET_PRE_SIGNED_URL,
    detail
})

export const getPreSignedUrlSuccess = () => ({
    type: GET_PRE_SIGNED_URL_SUCCESS,
})
export const getPreSignedUrlFailed = () => ({
    type: GET_PRE_SIGNED_URL_FAILED,
})
export const upload = (detail: UploadState): {
    detail: UploadState,
} => ({
    detail
})
export const progress = (detail: UploadState): {
    type: string,
    detail: UploadState,
} => ({
    type: UPLOAD_PROGRESS,
    detail
})