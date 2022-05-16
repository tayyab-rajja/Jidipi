import React, { useState, useEffect, useContext } from "react";
import styles from "src/components/Dashboard/CloudContent/CloudContent.module.css";
import groupIcon from "public/images/icon-group.png";
import Image from "next/image";

import fileIcon from "public/images/jpg-file.png";
import IconLens from "public/images/icon-lens.png";
import blankIcon from "public/images/creator-blank.png";
import { UserContext } from "src/providers/UserProvider";

import link from "public/images/link-icon.png";
import { GET } from "src/lib/common/api";
import TableHeader from "./TableHeader";
import GridView from "../GridView/GridView";
// import ChatComponent from "../../Chat/ChatComponent";
export default function PostData(props: any) {
  //global state
  const userContext: any = useContext(UserContext);
  const user = userContext.user;
  // local state
  const [toggleValue, settoggleValue] = useState(false);
  const [gridView, setgridView] = useState(false);
  const [FileList, setFileList] = useState<any[]>([]);
  const [GalleryId, setGalleryId] = useState("");

  const editChangeHandler = (event: any) => {
    settoggleValue(!toggleValue);
    console.log("value", toggleValue);
  };
  const showViewhandler = () => {
    setgridView(!gridView);
  };
  const galleryId = (id: any) => {
    setGalleryId(id);
  };

  useEffect(() => {
    const res = GET(
      `/company/${user.companyId}/folders?folderId=${props.postid}`
    );
    res.then((res) => {
      console.log(res);
      setFileList(res.folders);

      //console.log("img", res.data.folders[0].postId.featuredImage.liveURL);
    });
  }, [user.companyId, props.postid]);

  return (
    <div>
      <div className={styles["main-tbl-body-chat"]}>
        <div className={styles["white-box-chat"]}>
          <div className={styles[""]}>
            <div className={styles["head-part"]}>
              <div className={styles["select-x"]}>
                <select>
                  <option>UNCONNECTED</option>
                  <option>POST</option>
                </select>
              </div>
              <div className={styles["row2"]}>
                <div className={styles["search-width"]}>
                  <div className={styles["searchbox-x"]}>
                    <Image src={IconLens} alt="" className={styles["s-icon"]} />
                    <input
                      className={styles["input"]}
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <div className={styles["col1-post"]}>
                  <div
                    className={
                      styles[
                        !gridView ? "add-button-dd" : "list-view-button-dd"
                      ]
                    }
                    onClick={showViewhandler}
                  >
                    {!gridView && (
                      <div className={styles["view-div"]}>
                        <Image src={groupIcon} alt="" />
                        <span className={styles["txt-post"]}>Grid view</span>
                      </div>
                    )}
                    {gridView && (
                      <div className={styles["list-view-div"]}>
                        <Image src={groupIcon} alt="" />
                        <span className={styles["txt-post"]}>List view</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {!gridView && (
              <div className={styles["table-body-chat"]}>
                <table className={styles["table-style"]}>
                  <TableHeader type={true} />
                  <tbody className={styles["body-border"]}>
                    {FileList.map((item) => (
                      <tr
                        className={styles["body-post-row"]}
                        key={item._id}
                        onClick={() => galleryId(item.posts[0]._id)}
                      >
                        <td className={styles["tbdy-row"]}>
                          <Image src={fileIcon} alt="" />
                          <sup className={styles["sup1"]}>{item.name}</sup>
                        </td>
                        <td>
                          <div className={styles["creator"]}>
                            <h4 className={styles["table-body-font"]}>
                              {" "}
                              {item.createdBy ? item.createdBy.memberType : ""}
                            </h4>

                            <Image
                              src={blankIcon}
                              // width={20}
                              // height={20}
                              alt=""
                            />

                            <h5 className={styles["table-body-font"]}>
                              {" "}
                              {item.createdBy ? item.createdBy.firstName : ""}
                            </h5>
                          </div>
                        </td>
                        <td className={styles["table-body-font"]}>
                          {" "}
                          {item.updatedAt.substring(0, 10)}
                        </td>
                        <td className={styles["table-body-font"]}>
                          {" "}
                          {item.size / 1000}GB
                        </td>
                        <td>
                          <a
                            href={
                              item.postId && item.postId.featuredImage
                                ? item.postId.featuredImage.liveURL
                                : "#"
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Image src={link} alt="" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {gridView && (
              <div className={styles["grid-view"]}>
                <GridView galleryid={GalleryId} />
              </div>
            )}
          </div>
        </div>
        <div className={styles["chat-box"]}>
          {/* <ChatComponent /> */}
        </div>
      </div>
    </div>
  );
}
