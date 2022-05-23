import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "src/components/Dashboard/CloudContent/CloudContent.module.css";

import CloudTabs from "src/components/Dashboard/CloudContent/CloudTabs";
const CloudContent = () => {
  const [ActiveTab, setActiveTab] = useState("UNARCHIVED");

  const router = useRouter();
  const { type } = router.query;

  useEffect(() => {
    if (type === "information") {
      setActiveTab("INFORMATION");
    } else if (type === "post") {
      setActiveTab("POST");
    } else {
      setActiveTab("UNARCHIVED");
    }
  }, [type]);

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
                <Link href={"/dashboard/cloud/unconnected"}>
                  <a
                    className={
                      ActiveTab === "UNARCHIVED" ? styles["active"] : ""
                    }
                    // onClick={unconnectedHandler}
                  >
                    UNCONNECTED
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/cloud/post"}>
                  <a
                    className={ActiveTab === "POST" ? styles["active"] : ""}
                    // onClick={postHandler}
                  >
                    POST
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/cloud/information"}>
                  <a
                    className={
                      ActiveTab === "INFORMATION" ? styles["active"] : ""
                    }
                    // onClick={infoHandler}
                  >
                    INFORMATION
                  </a>
                </Link>
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
