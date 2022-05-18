
import axios from "axios";
import {FileObject, UploadState} from "./action";
import {POST} from "../common/api";

const CDN_URL = process.env.CDN_URL??'https://upload.jidipi.com';
export async function getPreSignedUrl(props: UploadState, e: any):Promise<UploadState|undefined> {
    if (!e || !e.target || !e.target.files) return;
    const fs: any[] = Array.from(e.target.files);
    if (!fs) return;
    // file: File, type: 'POST' | 'COMPANY', postId: string, companyId: string

    const initUploadList: UploadState = {
        type: props.type,
        postId: props.postId ?? undefined,
        companyId: props.companyId ?? undefined,
        files: [],
        isChatFile: props.isChatFile ?? false,
    }

    const uploadListWithoutLocalFile = {
        ...initUploadList,
        files: fs.map((file: any) => {
            return {
                name: file.name,
                size: file.size,
                type: file.type,
            }
        })
    };
    //Keep local files in local upload list.
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
    const r = await POST("/file/getPreSignedUrl", uploadListWithoutLocalFile);
    // STEP 2: Update upload list after getting pre-signed url
    if (r.success) {
        const fs = uploadListWithLocalFile.files.map((p: any) => {
            const file = r.files.find((f: any) => f.name === p.name);
            if (file) {
                p.preSignedUrl = file.preSignedUrl;
                p._id = file._id;
                p.liveURL = CDN_URL + '/' + file.key;
                // uploadFileToS3(p, onSuccess, onError,onProgress);
            }
            return p;
        });
        uploadListWithLocalFile.files = fs;
    }
    return uploadListWithLocalFile;
}

export const uploadFileToS3 = async ( file:FileObject,  onProgress: (_id: string, progress: number) => void, onSuccess: (_id: string) => void, onError: (_id: string, error: any) => void) => {
    const _id = file._id ?? '';
    const url = file.preSignedUrl ?? '';
    try{
        const res = await axios.request({
            method: 'PUT',
            url,
            data: file.localFile,
            headers:{
                "Content-Type": file.type,
            },
            onUploadProgress: (e:any) => {
                // const {loaded, total} = e;
                // Using local progress events

                if (e.lengthComputable) {
                    // let progress = loaded / total * 100;
                    // console.log(`${progress}% uploaded`);
                    if(e.loaded / e.total ===1){
                        onSuccess(_id);
                    }else{
                        onProgress(_id, e.loaded / e.total);
                    }
                }
            }
        });
        if(res.status===200)  onSuccess(_id);
        else onError(_id,res.statusText);
    }catch (e) {
        onError(_id, e);
    }finally {
        onSuccess(_id);
    }
}