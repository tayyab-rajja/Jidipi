import React, { useState } from "react";
import styles from "src/components/Dashboard/CloudContent/CloudContent.module.css";

import CloudTabs from "src/components/Dashboard/CloudContent/CloudTabs";
const CloudContent = () => {
  const [ActiveTab, setActiveTab] = useState("UNARCHIVED");

  const unconnectedHandler = () => {
    setActiveTab("UNARCHIVED");
  };
  const postHandler = () => {
    setActiveTab("POST");
  };
  const infoHandler = () => {
    setActiveTab("INFORMATION");
  };
  return (
    <>
      <div className={styles["box-tp-ad"]}> </div>
      {/* <div style={{ display: "flex" }}> */}
      {/* TABLE CONTENT  */}
      <div className={styles["content-cloud-table-outer"]}>
        <div className={styles["cloud-table-tp-nv-row"]}>
          <div className={styles["ct-tp-nav"]}>
            <ul className={styles["ul"]}>
              <li>
                <a
                  className={ActiveTab === "UNARCHIVED" ? styles["active"] : ""}
                  onClick={unconnectedHandler}
                >
                  UNCONNECTED
                </a>
              </li>
              <li>
                <a
                  className={ActiveTab === "POST" ? styles["active"] : ""}
                  onClick={postHandler}
                >
                  POST
                </a>
              </li>
              <li>
                <a
                  className={
                    ActiveTab === "INFORMATION" ? styles["active"] : ""
                  }
                  onClick={infoHandler}
                >
                  INFORMATION
                </a>
              </li>
            </ul>
          </div>
          <div className={styles["dt-data-button"]}>DATA</div>
        </div>
        <CloudTabs type={ActiveTab} />
      </div>
      {/* <div>chatbox</div> */}
      {/* </div> */}
    </>
  );
};

export default CloudContent;
