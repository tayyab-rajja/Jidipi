import React, { useState, useContext } from "react";
import styles from "src/components/Dashboard/CloudContent/RenameModal/rename.module.css";
import Modal from "react-modal";
import { UserContext } from "src/providers/UserProvider";
import { PUT } from "src/lib/common/api";
import closeIcon from "public/dashboard/cloud/images/close-button.png";
import Image from "next/image";
import axios from "axios";
function RenameModal(props: any) {
  //global state
  // const userContext: any = useContext(UserContext);
  // const user = userContext.user;
  let user = { companyId: "615b101e899dd8828faf0547" };
  //local states
  const [Rename, setRename] = useState("");
  const renamehandler = (event: any) => {
    setRename(event.target.value);
  };
  const rename = () => {
    const res = PUT(`/company/${props.Folderid}/document`, { name: Rename });
    res.then((res) => {
      props.showModalHandler();
      props.getFolder();
    });
  };
  return (
    <>
      <Modal isOpen={props.isOpen} className={styles["modal-box"]}>
        <div className={styles["header"]}>
          <span className={styles["text"]}>Rename</span>

          <Image
            src={closeIcon}
            alt=""
            onClick={() => props.showModalHandler()}
          />
        </div>
        <div className={styles["body-div"]}>
          <input
            className={styles["input-style"]}
            placeholder="Enter name"
            onChange={renamehandler}
          />
        </div>
        <div className={styles["btn-container"]}>
          <div
            className={styles["btn-body"]}
            onClick={() => props.showModalHandler()}
          >
            <span className={styles["text"]}>Cancel</span>
          </div>
          <div className={styles["btn-body"]} onClick={rename}>
            <span className={styles["text"]}>Confirm</span>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default RenameModal;
