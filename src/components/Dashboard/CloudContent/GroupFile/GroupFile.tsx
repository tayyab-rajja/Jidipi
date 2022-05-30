import React, { useState, useEffect, useCallback, useContext } from "react";
import styles from "src/components/Dashboard/CloudContent/MoveToModal/moveto.module.css";
import cloudIcon from "public/dashboard/cloud/images/icon-cloud.png";
import uploadIcon from "public/dashboard/cloud/images/upload-file.png";
import { UserContext } from "src/providers/UserProvider";
import folderIcon from "public/dashboard/cloud/images/folder-icon.png";
import closeIcon from "public/dashboard/cloud/images/close-button.png";
import Modal from "react-modal";
import { POST } from "src/lib/common/api";
import { PUT } from "src/lib/common/api";
import { GET } from "src/lib/common/api";
// import { FileUploader } from "react-drag-drop-files";

import Image from "next/image";
import FolderItem from "src/components/SaveInFolderSidebar/FolderItem/FolderItem";
import { upload } from "src/lib/file/action";
import axios from "axios";

function GroupFile(props: any) {
  //global state
  const userContext: any = useContext(UserContext);
  const user = userContext.user;

  const [FolderData, setFolderData] = useState<any[]>([]);
  const [Foldername, setFoldername] = useState("");

  const folderNamehandler = (event: any) => {
    setFoldername(event.target.value);
  };
  const addNewFolder = () => {
    const res = POST(`/company/${user.companyId}/folder`, { name: Foldername });
    res.then((res) => {
      getFolderData();
    });
    res.catch((err) => {
      console.log(err);
    });
  };
  const MoveFolderhandler = (id: any) => {
    const res = PUT(`/company/${user.companyId}/group`, {
      pageFolderId: id,
      files: props.Folderid,
    });
    res.then((res) => {
      props.getFolder();
      props.showModalHandler();
    });
  };

  const getFolderData = useCallback(() => {
    const res = GET(
      `/company/${user.companyId}/folders?categoryType=UNARCHIVED`
    ).then((res) => {
      setFolderData(res.folders);
    });
  }, [user.companyId]);
  useEffect(() => {
    getFolderData();
  }, [getFolderData]);

  return (
    <>
      <Modal isOpen={props.isOpen} className={styles["modal-box"]}>
        <div className={styles["title"]}>
          <span>Group file </span>
          <Image
            src={closeIcon}
            alt=""
            onClick={() => props.showModalHandler()}
          />
        </div>
        <div className={styles["body-div"]}>
          {FolderData.map((item) => (
            <div
              className={styles["icn-name"]}
              key={item._id}
              onClick={() => MoveFolderhandler(item._id)}
            >
              <span className={styles["folder-icon"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="24"
                  viewBox="0 0 28 24"
                  className={styles["folder-icon"]}
                >
                  <path
                    id="icon_folder_5"
                    data-name="icon folder 5"
                    d="M30,24.333a2.6,2.6,0,0,1-.82,1.886A2.873,2.873,0,0,1,27.2,27H4.8a2.873,2.873,0,0,1-1.98-.781A2.6,2.6,0,0,1,2,24.333V5.667a2.6,2.6,0,0,1,.82-1.886A2.873,2.873,0,0,1,4.8,3h7l2.8,4H27.2a2.873,2.873,0,0,1,1.98.781A2.6,2.6,0,0,1,30,9.667Z"
                    transform="translate(-2 -3)"
                    fill="#bdc0c6"
                  />
                </svg>
              </span>

              <span className={styles["text"]}>{item.name}</span>
            </div>
          ))}
        </div>
        <div className={styles["footer"]}>
          <div className={styles["icn-input"]}>
            <Image src={folderIcon} alt="" />

            <input
              className={styles["input-style"]}
              placeholder="Add new folder name"
              onChange={folderNamehandler}
            />
          </div>

          <Image src={closeIcon} alt="" onClick={addNewFolder} />
        </div>
      </Modal>
    </>
  );
}

export default GroupFile;
