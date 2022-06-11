import React, { useState, useEffect, useCallback, useContext } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import styles from "src/components/Dashboard/CloudContent/AddModal/Modal.module.css";
import cloudIcon from "public/dashboard/cloud/images/icon-cloud.png";
import uploadIcon from "public/dashboard/cloud/images/upload-file.png";
import folderIcon from "public/dashboard/cloud/images/icon-folder.png";
import closeIcon from "public/dashboard/cloud/images/close-button.png";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import FolderItem from "src/components/SaveInFolderSidebar/FolderItem/FolderItem";
import { upload } from "src/lib/file/action";
import { POST } from "../../../../lib/common/api";
import axios from "axios";
import UploadFile from "../../File/File";
import { PUT } from "../../../../lib/common/api";
import { GET } from "../../../../lib/common/api";
function EditableModal(props: any) {
  // const user = userContext.user;
  // console.log("user", user);
  // let user = { companyId: "615b101e899dd8828faf0547" };

  const [ActiveSec, setActiveSec] = useState(1);

  const [FolderName, setFolderName] = useState("");
  const [pageFolderid, setpageFolderid] = useState("");
  const [PagesList, setPagesList] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone();

  const getPagesData = useCallback(() => {
    const res = GET(`/pages`);
    res.then((result) => {
      console.log("response", result);
      setPagesList(result.pageFolders);
    });
  }, []);
  useEffect(() => {
    console.log("FolderItemid", props.FolderItemid);
    getPagesData();
  }, []);

  const addFolderHandler = () => {
    setActiveSec(1);
    // setActiveColor1("#F5F5F5");
  };
  const uploadFolderHandler = () => {
    setActiveSec(2);
  };
  const foldernamehandler = (event: any) => {
    //event.preventDefault();
    setFolderName(event.target.value);
    console.log("name", FolderName);
  };
  const getParentId = (id: any) => {
    setpageFolderid(id);
  };

  const userContext: any = useContext(UserContext);
  const user = userContext.user;
  const submitfoldername = () => {
    const res = PUT(`/company/${user.companyId}/group`, {
      pageFolderId: pageFolderid,
      files: props.FolderItemid._id,
    });
    res.then((res) => {
      console.log("response", res.data);
      props.showModalHandler();
      props.getFolder();
    });
  };
  // const res = POST(`/company/${user.companyId}/folder`, {
  //   name: FolderName,
  //   color: "#C5C5C5",
  // });
  // res.then((res) => {
  //   console.log(res.data);
  //   props.showModalHandler();
  //   props.getFolder();
  // });
  // res.catch((err) => {
  //   console.log(err);
  // });

  const activeSection = () => {
    if (ActiveSec == 1) {
      return (
        <div>
          <div>
            <div className={styles["title"]}>
              <h6 className={styles["text-st"]}>Select a page</h6>
              <Image
                src={closeIcon}
                alt=""
                onClick={() => props.showModalHandler()}
              />
            </div>
          </div>
          <div className={styles["upload-content"]}>
            <div className={styles["page-input"]}>
              <div>
                <select
                  name="cars"
                  id="cars"
                  className={styles["dropdown"]}
                  onChange={(event) => getParentId(event.target.value)}
                >
                  <option
                    value="defaultname"
                    className={styles["option-style"]}
                  ></option>
                  {PagesList.map((itm, index) => (
                    <option
                      key={index}
                      value={itm._id}
                      className={styles["option-style"]}
                    >
                      {itm.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles["btn-container"]}>
              <div
                className={styles["btn-body"]}
                onClick={() => props.showModalHandler()}
              >
                <span
                  className={styles["text"]}
                  onClick={() => props.showModalHandler()}
                >
                  Cancel
                </span>
              </div>
              <div className={styles["btn-body"]} onClick={submitfoldername}>
                <span className={styles["text"]}>Confirm</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // if (ActiveSec == 2) {
    //   return (
    //     <div>
    //       <div>
    //         <div className={styles["title"]}>
    //           <h6 className={styles["text-st"]}>
    //             {" "}
    //             Upload a folder from computer
    //           </h6>
    //           <Image
    //             src={closeIcon}
    //             alt=""
    //             onClick={() => props.showModalHandler()}
    //           />
    //         </div>
    //       </div>
    //       <div className={styles["upload-content"]}>
    //         <label className={styles["upload-content"]}>
    //           <div className={styles["icon"]}>
    //             <Image src={cloudIcon} alt="" />
    //           </div>

    //           <div>
    //             <UploadFile
    //               type="COMPANY"
    //               companyId="615b101e899dd8828faf0547"
    //             />
    //             {/* <h4 className={styles["text-st"]}>
    //               Drag and Drop or{" "}
    //               <span id="004" className={styles["brows-col"]}>
    //                 Browse
    //               </span>{" "}
    //               to upload
    //             </h4> */}
    //           </div>
    //         </label>
    //       </div>
    //     </div>
    //   );
    // }
  };
  return (
    <>
      <Modal isOpen={props.isOpen} className={styles["modal-box"]}>
        <div className={styles["main-left"]}>
          <div
            className={styles[ActiveSec == 1 ? "active-section" : "section"]}
            onClick={addFolderHandler}
          >
            <Image src={folderIcon} alt="" />
            <h6 className={styles["text-st"]} style={{ marginRight: "15px" }}>
              Send to post
            </h6>
          </div>
          <div
            className={styles[ActiveSec == 2 ? "active-section" : "section"]}
            onClick={uploadFolderHandler}
          >
            <Image src={folderIcon} alt="" />
            <h6 className={styles["text-st"]}> Send to information</h6>
          </div>
        </div>
        <div className={styles["left-section"]}>
          <div>{activeSection()}</div>
        </div>
      </Modal>
    </>
  );
}

export default EditableModal;
