import React, { useState, useEffect, useCallback, useContext } from "react";
import styles from "src/components/Dashboard/CloudContent/ChangeColor/changecolor.module.css";
import cloudIcon from "public/images/icon-cloud.png";
import { UserContext } from "src/providers/UserProvider";
import uploadIcon from "public/images/upload-file.png";
import folderIcon from "public/images/folder-icon.png";
import closeIcon from "public/images/close-button.png";
// import Modal from "react-modal";
import Modal from "react-modal";
import { PUT } from "src/lib/common/api";

function ChangeColorModal(props: any) {
  //global state
  const userContext: any = useContext(UserContext);
  const user = userContext.user;

  const color = [
    "#f5675d",
    "#e0a558",
    "#e8df3a",
    "#278f4d",
    "#1bcfbd",
    "#47adcc",
    "#0c4d6b",
    "#3e2c91",
    "#ba2d6a",
    "#746e78",
  ];
  const changecolorhandler = (item: any) => {
    const res = PUT(`/company/${props.Folderid}/document`, { color: item });
    res.then((res) => {
      props.showModalHandler();
      props.getFolder();
    });
  };

  return (
    <>
      <Modal isOpen={props.isOpen} className={styles["modal-box"]}>
        {color.map((item, index) => (
          <div key={index} onClick={() => changecolorhandler(item)}>
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
                fill={item}
              />
            </svg>
          </div>
        ))}
      </Modal>
    </>
  );
}

export default ChangeColorModal;
