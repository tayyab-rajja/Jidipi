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

function AddModal(props: any) {
  // const user = userContext.user;
  // console.log("user", user);
  // let user = { companyId: "615b101e899dd8828faf0547" };

  const [ActiveSec, setActiveSec] = useState(1);
  const [FolderName, setFolderName] = useState("");
  const [ActiveColor1, setActiveColor1] = useState("");
  const { getRootProps, getInputProps } = useDropzone();
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
  const onDrop = useCallback((acceptedFiles) => {
    console.log("file", acceptedFiles);
  }, []);
  const userContext: any = useContext(UserContext);
  const user = userContext.user;
  const submitfoldername = () => {
    const res = POST(`/company/${user.companyId}/folder`, {
      name: FolderName,
      color: "#C5C5C5",
    });
    res.then((res) => {
      console.log(res.data);
      props.showModalHandler();
      props.getFolder();
    });
    res.catch((err) => {
      console.log(err);
    });
  };
  const activeSection = () => {
    if (ActiveSec == 1) {
      return (
        <div>
          <div>
            <div className={styles["title"]}>
              <h6 className={styles["text-st"]}>Add new folder</h6>
              <Image
                src={closeIcon}
                alt=""
                onClick={() => props.showModalHandler()}
              />
            </div>
          </div>
          <div className={styles["upload-content"]}>
            <div>
              <input
                className={styles["input-style"]}
                placeholder="Enter name"
                onChange={foldernamehandler}
              />
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
    if (ActiveSec == 2) {
      return (
        <div>
          <div>
            <div className={styles["title"]}>
              <h6 className={styles["text-st"]}>
                {" "}
                Upload a folder from computer
              </h6>
              <Image
                src={closeIcon}
                alt=""
                onClick={() => props.showModalHandler()}
              />
            </div>
          </div>
          <div className={styles["upload-content"]}>
            <label className={styles["upload-content"]}>
              <div className={styles["icon"]}>
                <Image src={cloudIcon} alt="" />
              </div>

              <div>
                <UploadFile
                  type="COMPANY"
                  companyId="615b101e899dd8828faf0547"
                />
                {/* <h4 className={styles["text-st"]}>
                  Drag and Drop or{" "}
                  <span id="004" className={styles["brows-col"]}>
                    Browse
                  </span>{" "}
                  to upload
                </h4> */}
              </div>
            </label>
          </div>
        </div>
      );
    }
    if (ActiveSec == 3) {
      return (
        <div>
          <div>
            <div className={styles["title"]}>
              <h6 className={styles["text-st"]}>Add file</h6>
              <Image
                src={closeIcon}
                alt=""
                onClick={() => props.showModalHandler()}
              />
            </div>
          </div>
          <div className={styles["upload-content"]}>
            <label className={styles["upload-content"]}>
              <div className={styles["icon"]}>
                <Image src={cloudIcon} alt="" />
              </div>

              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <h4 className={styles["text-st"]}>
                  Drag and Drop or{" "}
                  <span id="004" className={styles["brows-col"]}>
                    Browse
                  </span>{" "}
                  to upload
                </h4>
              </div>
            </label>
          </div>
        </div>
      );
    }
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
              Add folder
            </h6>
          </div>
          <div
            className={styles[ActiveSec == 2 ? "active-section" : "section"]}
            onClick={uploadFolderHandler}
          >
            <Image src={folderIcon} alt="" />
            <h6 className={styles["text-st"]}>Upload folder</h6>
          </div>
          <div
            className={styles[ActiveSec == 3 ? "active-section" : "section"]}
            onClick={() => setActiveSec(3)}
          >
            <Image src={uploadIcon} alt="" />
            <h6 className={styles["text-st"]} style={{ marginRight: "15px" }}>
              Upload file
            </h6>
          </div>
        </div>
        <div className={styles["left-section"]}>
          <div>{activeSection()}</div>
        </div>
      </Modal>
    </>
  );
}

export default AddModal;
