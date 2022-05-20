import {FileType, retrySingleFile, upload, UploadState, UploadStatus} from "../../../lib/file/action";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

/**
 * Demo of file upload, which handle multiple files upload at the same time.
 * Upload the files for post, company, avatar and logo
 * * not work for progress yet.
 *
 * @param props
 * @constructor
 * e:HTMLINPUTELEMENTS
 * to start  upload, run follow function in file picker.
 * dispatch(upload(avatarState, e));
 *
 * To watch the status:
 * const uploadState = useSelector(state => state.file);
 * uploadState.status = UploadStatus.allSuccess mean upload complete.
 *
 */
const File2 = (props: any) => {
    const dispatch = useDispatch();

    // Upload files to post and company, require  type and postId|companyId
    const state: UploadState = {
        files: [], type: FileType.POST, postId: props.postId
    };
    // Upload logo, require  type: FileType.AVATAR
    const avatarState: UploadState = {
        files: [], type: FileType.AVATAR
    };
    // Upload logo, require companyId,type: FileType.LOGO
    const logoState: UploadState = {
        files: [], type: FileType.LOGO, companyId: props.companyId._id
    };

    // Watch upload status, and display status bar or feedback error.
    // @ts-ignore
    const uploadState = useSelector(state => state.file);
    useEffect(() => {
        // uploadState.status= UploadStatus.allSuccess mean upload complete.
        console.log('useEffect', uploadState.status);
        if(uploadState.status === UploadStatus.allSuccess){
            // Use this uploadState.files[0]
        }
    }, [
        uploadState
    ])


    return <div>
        <h2>File Upload.. </h2>
        File picker and list, Please change the layout to you wanted.
        <input name="file" type="file" multiple={true} onChange={(e) => {
            dispatch(upload(state, e));
        }
        }/>
        <p></p>        <p></p>
        <p>Upload Avatar example:</p>
        <input name="file" type="file"  onChange={(e) => {
            dispatch(upload(avatarState, e));
        }}/>
        <p></p>        <p></p>
        <p>Upload LOGO example:</p>
        <input name="file" type="file"   onChange={(e) => {
            dispatch(upload(logoState, e));
        }}/>
        <button onClick={()=>{
            // If upload failed, !uploadState.files[0].success, retry button, but not need in upload avatar.
           dispatch(retrySingleFile(uploadState.files[0], FileType.LOGO));
        }
        } >Retry</button>
    </div>
}
export default File2;