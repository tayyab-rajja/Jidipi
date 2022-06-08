import React, { useState, useEffect, useContext, useCallback } from "react";
import styles from "src/components/Dashboard/CloudContent/MoveToModal/moveto.module.css";
import cloudIcon from "public/dashboard/cloud/images/icon-cloud.png";
import { UserContext } from "src/providers/UserProvider";
import uploadIcon from "public/dashboard/cloud/images/upload-file.png";
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

function MoveTo(props: any) {
  const [FolderData, setFolderData] = useState<any[]>([]);
  const [ParentFolderId, setParentFolderId] = useState("");
  const [Foldername, setFoldername] = useState("");

  //global state
  // const userContext: any = useContext(UserContext);
  // const user = userContext.user;
  let user = { companyId: "615b101e899dd8828faf0547" };

  //methods
  const folderNamehandler = (event: any) => {
    setFoldername(event.target.value);
  };
  const addNewFolder = useCallback(() => {
    const res = POST(`/company/${user.companyId}/folder`, { name: Foldername });
    res.then((res) => {});
    res.catch((err) => {
      console.log(err);
    });
  }, [user.companyId, Foldername]);
  const MoveFolderhandler = (id: any) => {
    const res = PUT(`/company/${props.Folderid}/document`, {
      parentFolderId: id,
      action: "move",
    });
    res.then((res) => {
      props.getFolder();
      props.showModalHandler();
    });
  };

  const getFolderData = useCallback(() => {
    const res = GET(
      `/company/${user.companyId}/folders?categoryType=UNARCHIVED`
    );
    res.then((res) => {
      setFolderData(res.folders);
    });
  }, [user.companyId]);
  useEffect(() => {
    getFolderData();
  }, []);

  return (
    <>
      <Modal isOpen={props.isOpen} className={styles["modal-box"]}>
        <div className={styles["title"]}>
          <span>Move to </span>
          <Image
            src={closeIcon}
            alt=""
            onClick={() => props.showModalHandler()}
          />
        </div>
        <div className={styles["body-div"]}>
          {FolderData.map((item) =>
            item.isSpecial == false ? (
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
            ) : null
          )}
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

export default MoveTo;
