import {useEffect, useState} from "react";
import {getPreSignedUrl, uploadFileToS3} from "../../../lib/file/upload";
import {UploadState} from "../../../lib/file/action";
import {POST} from "../../../lib/common/api";

/**
 * @description Upload file component, can handle multiple files and dispay process bar using the AWS S3 pre-signed url
 * @param props
 * @constructor
 *
 * Post the theme on `props`
 * type: POST OR COMPANY
 * isChatFile: true or false, upload from chat or not
 * postId: post id, required when type =POST
 * companyId: company id, required when type =COMPANY
 */
const UploadFile = (props: any) => {
    const [uploadList, setUploadList] = useState<UploadState | undefined>();
    const handleFileChange = () => async (e: any) => {
        // STEP 1: Get pre-signed url
        const uploadList: UploadState | undefined = await getPreSignedUrl(props, e);
        if (!uploadList) {
            // Alert error, 1, hasn't pick any file, 2, get pre signed url failed,
            return;
        }
        setUploadList(uploadList);
        // EOF storage pre signed url and _id into upload list
    };


    useEffect(() => {
        console.log("uploadList:::::::::::::::::::::", uploadList);
        let startUploadToS3 = false;
        if (!uploadList) return;
        const fs = uploadList.files.map((file: any) => {
            // STEP 2 upload to S3
            if (file._id && file.progress === undefined) {
                file.progress = 0;
                uploadFileToS3(file, onProgress, onSuccess, onError);
                startUploadToS3 = true;
            } else if (file._id && file.success && !file.uploadedAt) {
                // STEP 3: Upload success, tell API
                file.uploadedAt = new Date();
                POST('/file/preSignedUrlUploadSuccess', {
                    fileId: file._id,
                    isChatFile: file.isChatFile,
                    postId: file.postId,
                    companyId: file.companyId
                })
                    .then(() => {
                    });
            }
            return file;
        });
        if (startUploadToS3) setUploadList({...uploadList, files: fs});
    }, [uploadList]);
    /**
     * @description Handle upload progress
     * @param _id  the file id
     * Each file has speical _id and when uploading this file to AWS S3 failed, can click retry button to upload again
     */
    const retry = async (_id: string) => {
        if (!uploadList) return;
        const fs = uploadList.files.map((p: any) => {
            if (p._id === _id) {
                p.progress = 0;
                p.error = 0;
                uploadFileToS3(p, onProgress, onSuccess, onError);
            }
            return p;
        });
        setUploadList({...uploadList, files: fs});
    }

    /**
     * @description Handle upload progress
     * @param _id file id
     * 1, update the state of progress
     * 2, remove the file from upload list, set success = true;
     * 3, update API to save file to DB
     */
    const onSuccess = (_id: any) => {
        if (!uploadList) return;
        const fs = uploadList.files.map((p: any) => {
            if (p._id === _id) {
                p.success = true;
                p.error = null;
                p.progress = 100;
            }
            return p;
        })
        const newUploadList = {
            ...uploadList,
            files: fs
        };
        setUploadList(newUploadList);
    };
    /**
     * @description Handle upload progress
     * @param _id
     * @param error
     */
    const onError = (_id: any, error: any) => {
        if (!uploadList) return;
        const newUploadList = {
            ...uploadList,
            files: uploadList.files.map((p: any) => {
                if (p._id === _id) {
                    p.success = false;
                    p.progress = undefined;
                    p.error = error;
                }
                return p;
            })
        };
        setUploadList(newUploadList);
    };
    /**
     * @description Handle upload progress
     * @param _id
     * @param progress
     * Used to display the progress bar
     */
    const onProgress = (_id: any, progress: number) => {
        if (!uploadList) return;
        const newUploadList = {
            ...uploadList,
            files: uploadList.files.map((p: any) => {
                if (p._id === _id) {
                    p.progress = (progress * 100).toFixed(2);
                    p.error = null;
                }
                return p;
            })
        };
        setUploadList(newUploadList);
    };


    return <div>
        <h2>File Upload.. </h2>
        File picker and list, Please change the layout to you wanted.
        {uploadList && uploadList.files.map((p: any, i: number) => {
            return (
                <div key={i}>
                    <p>{p.name} ::: {p.size}</p>
                    <p>{p.progress}%, {p.success &&  <span>  LIVE URL: {p.liveURL} <strong>Success</strong>     </span>   }</p>
                    <p>
                        <button onClick={() => retry(p._id)}>Retry</button>
                    </p>
                </div>

            )
        })}
        <input name="file" type="file" multiple={true} onChange={handleFileChange()}/>
    </div>
}
export default UploadFile;