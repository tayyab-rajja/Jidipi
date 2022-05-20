import React, { useState, useEffect, useCallback, useContext } from "react";
import styles from "src/components/Dashboard/CloudContent/CloudContent.module.css";
// import Form from "react-bootstrap/Form";
import Image from "next/image";
import ArrowUp from "public/images/arrow-up.png";
import ArrowDown from "public/images/arrow-down.png";
import IconLens from "public/images/icon-lens.png";
import folderIcon from "public/images/folder-icon.png";
// import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
// import ToggleButton from "react-bootstrap/ToggleButton";
import iconColor from "public/images/icon-colour.png";
import deleteIcon from "public/images/Delete-icon.png";
import downloadIcon from "public/images/icon-download.png";
import editIcon from "public/images/Edit-icon.png";
import starIcon from "public/images/star-frame-icon-filled.png";
import starFrame from "public/images/start-frame-icon.png";
import groupIcon from "public/images/icon-group.png";
import folderMove from "public/images/Folder-Move-icon.png";
import copyIcon from "public/images/icon-copy.png";
import blankIcon from "public/images/creator-blank.png";
import unstar from "public/images/start-frame-icon.png";
import stared from "public/images/star-frame-icon-filled.png";
// import Table from "react-bootstrap/Table";
import AddModal from "./AddModal/AddModal";
import axios from "axios";
import MoveTo from "./MoveToModal/MoveTo";
import ChangeColorModal from "./ChangeColor/ChangeColorModal";
import RenameModal from "./RenameModal/RenameModal";
import GroupFile from "./GroupFile/GroupFile";
import token from "./Config/Token";
import { UserContext } from "../../../providers/UserProvider";
import { PUT } from "../../../lib/common/api";
import { GET } from "../../../lib/common/api";
import { DELETE } from "../../../lib/common/api";
import TableHeader from "./Table/TableHeader";
import PostData from "./Table/PostData";
export default function CloudTabs(props: any) {
  //global state
  const userContext: any = useContext(UserContext);
  const user = userContext.user;
  // local state
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPage, setshowPage] = useState(false);
  const [toggleValue, settoggleValue] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [xPosition, setxPosition] = useState("");
  const [yPosition, setyPosition] = useState("");
  const [FolderData, setFolderData] = useState<any[]>([]);
  const [FilterFolderData, setFilterFolderData] = useState<any[]>([]);
  const [toggleBlakColor, settoggleBlakColor] = useState(false);
  const [MoveToModal, setMoveToModal] = useState(false);
  const [ChangecolorModal, setChangecolorModal] = useState(false);
  const [Renamemodal, setRenamemodal] = useState(false);
  const [Groupfile, setGroupfile] = useState(false);
  const [FolderID, setFolderID] = useState("");
  const [Category, setCategory] = useState("UNARCHIVED");
  const [SearchValue, setSearchValue] = useState("");
  const [SearchTerm, setSearchTerm] = useState("");
  const [postTable, setpostTable] = useState(false);
  const [postId, setpostId] = useState("");
  const [PagesList, setPagesList] = useState<any[]>([]);

  const CDN_URL = process.env.CDN_URL ?? "https://upload.jidipi.com";

  const categoryhandler = (event: any) => {
    setCategory(event.target.value);
  };
  const searchHandler = (event: any) => {
    console.log("key", event.target.value);
    setSearchValue(event.target.value);
  };
  const searchSubmitHandler = (event: any) => {
    event.preventDefault();
    console.log("submitteed", SearchValue);
    setSearchTerm(SearchValue);
    //getFolderData();
  };
  const selectHandler = (event: any) => {
    console.log(event.target.value);
  };

  const editChangeHandler = (event: any) => {
    settoggleValue(!toggleValue);
    console.log("value", toggleValue);
  };
  const showDropdownhandler = (e: any, item: any) => {
    if (props.type === "UNARCHIVED") {
      e.preventDefault();
      setCoordinates(e.clientX, e.clientY);
      showDropdown && setShowDropdown(true);
      setFolderID(item._id);
      console.log("item", item);
      setShowDropdown(true);
    }
  };
  const markstarhandler = () => {
    const res = PUT(`/company/${FolderID}/document`, {
      isStar: true,
    });
    res.then((res) => {
      console.log(res.data);
      getFolderData();
    });
  };
  const removestarhandler = () => {
    const resp = PUT(`/company/${FolderID}/document`, { isStar: false });
    resp.then((res) => {
      console.log(res.data);
      getFolderData();
    });
  };
  const deletedocumenthandler = () => {
    const res = DELETE(`/company/${FolderID}/document`);
    res.then((res) => {
      console.log(res.data);
      getFolderData();
    });
  };
  const duplicatehandler = () => {
    const res = PUT(`/company/${FolderID}/document/copy`, {});
    res.then((res) => {
      console.log(res.data);
      getFolderData();
    });
  };
  const downloadfolderhandler = () => {
    const res = GET(`/document/${FolderID}/download`);
    res.then((res) => {
      console.log("download", res.data);
      //getFolderData();
    });
  };

  const setCoordinates = (x: any, y: any) => {
    setxPosition(x);
    setyPosition(y);
    console.log("xx", x);
    console.log("yy", y);
  };
  const showModalHandler = () => {
    setModalShow(!modalShow);
    console.log(modalShow);
  };
  const movetohandler = () => {
    //showDropdown && setShowDropdown(false);
    setMoveToModal(!MoveToModal);
  };
  const changecolorhandler = () => {
    //ChangecolorModal && setChangecolorModal(false);
    setChangecolorModal(!ChangecolorModal);
  };
  const renamehnadler = () => {
    setRenamemodal(!Renamemodal);
  };
  const groupfilehandler = () => {
    setGroupfile(!Groupfile);
  };
  const getPostFoldersId = (postfolderid: any) => {
    if (props.type === "POST") {
      console.log("postid", postfolderid);
      setpostId(postfolderid);
      setpostTable(true);
    }
  };

  //actions
  const actions = [
    {
      name: "Duplicate",
      onClick: () => duplicatehandler(),
      src: copyIcon,
    },
    {
      name: "Move to",
      onClick: () => movetohandler(),
      src: folderMove,
    },
    {
      name: "Group files",
      onClick: () => groupfilehandler(),
      src: groupIcon,
    },
    {
      name: "Mark star",
      onClick: () => markstarhandler(),
      src: unstar,
    },
    {
      name: "Remove star",
      onClick: () => removestarhandler(),
      src: stared,
    },
    {
      name: "Change color",
      onClick: () => changecolorhandler(),
      src: iconColor,
    },
    {
      name: "Rename",
      onClick: () => renamehnadler(),
      src: editIcon,
    },
    {
      name: "Download",
      onClick: () => downloadfolderhandler(),
      src: downloadIcon,
    },
    {
      name: "Delete",
      onClick: () => deletedocumenthandler(),
      src: deleteIcon,
    },
  ];
  const handleClick = useCallback(() => {
    showDropdown && setShowDropdown(false);
    setxPosition("");
    setyPosition("");
  }, [showDropdown]);
  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.addEventListener("click", handleClick);
    };
  });
  const getFolderData = useCallback(() => {
    const res = GET(
      `/company/${user.companyId}/folders?categoryType=${props.type}&searchKey=${SearchTerm}`
    );
    res.then((result) => {
      console.log("response", result);
      setFolderData(result.folders);
    });
  }, [props.type, SearchTerm]);

  const getPagesData = useCallback(() => {
    const res = GET(`/pages`);
    res.then((result) => {
      console.log("response", result);
      setPagesList(result.pageFolders);
    });
  }, []);

  useEffect(() => {
    getFolderData();
    getPagesData();
    setpostTable(false);
  }, [props.type, SearchTerm, getFolderData, getPagesData, user]);

  return (
    <div>
      {!postTable && (
        <div className={styles["white-box"]}>
          <div className={styles[""]}>
            <div className={styles["head-part"]}>
              <div className={styles["select-x"]}>
                <select onChange={categoryhandler}>
                  <option value={props.type}>{props.type}</option>
                </select>
              </div>
              <div className={styles["row2"]}>
                {props.type === "UNARCHIVED" && (
                  <div className={styles["col1"]}>
                    <div
                      onClick={showModalHandler}
                      className={styles["add-button-dd"]}
                    >
                      <i className={styles["fa-solid fa-plus me-2"]}></i> Add
                    </div>
                  </div>
                )}
                <div className={styles["search-width"]}>
                  <div className={styles["searchbox-x"]}>
                    <Image src={IconLens} alt="" className={styles["s-icon"]} />
                    <form onSubmit={searchSubmitHandler}>
                      <input
                        className={styles["input"]}
                        type="text"
                        placeholder="Search"
                        onChange={searchHandler}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["table-body"]}>
              <table className={styles["table-style"]}>
                <TableHeader type={false} />

                {!postTable && (
                  <tbody className={styles["body-border"]}>
                    {FolderData.map((item) => (
                      <tr
                        key={item._id}
                        className={styles["body-row"]}
                        // style={{
                        //   backgroundColor: toggleBlakColor ? "#000000" : "#f2f2f2",
                        //   color: toggleBlakColor ? "#FFFFFF" : "black",
                        // }}
                        onContextMenu={() => showDropdownhandler(event, item)}
                        onClick={() => getPostFoldersId(item._id)}
                      >
                        <td className={styles["tbdy-row"]}>
                          <Image src={folderIcon} alt="" />

                          <sup className={styles["sup1"]}>
                            {item.name ? item.name : ""}
                          </sup>
                          {!item.isStar && (
                            <div>
                              <Image src={unstar} alt="" />
                            </div>
                          )}
                          {item.isStar && (
                            <div>
                              <Image src={stared} alt="" />
                            </div>
                          )}
                        </td>
                        <td>
                          <div className={styles["creator"]}>
                            <div className={styles["table-body-font2"]}>
                              <div className={styles["table-body-font"]}>
                                {item.createdBy ? item.createdBy.memberType : ""}
                              </div>
                              <Image
                                src={`${CDN_URL}/avatars/default.svg`}
                                width={20}
                                height={20}
                                alt=""

                              />
                            </div>

                            <div className={styles["table-body-font-post"]}>
                              {item.createdBy ? item.createdBy.firstName : ""}
                            </div>


                          </div>
                        </td>
                        
                        <td >
                          <div className={styles["mod"]} >
                            {item.updatedAt.substring(0, 10)}
                          </div>
                        </td>
                        <td >
                          <div className={styles["volume"]} >
                            {item.size / 1000}GB
                          </div>
                        </td>

                        <td className="">
                          <div className={styles["page-input"]}>
                            <div>
                              <select
                                name="cars"
                                id="cars"
                                className={styles["dropdown"]}
                              >
                                {PagesList.map((item, index) => (
                                  <option
                                    key={index}
                                    value="defaultname"
                                    className={styles["option-style"]}
                                  >
                                    {item.title}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles["switch-x-outer"]}>
                            <input
                              type="checkbox"
                              // defaultChecked={toggleValue}
                              //onChange={editChangeHandler}
                              value={item.editable}
                              className={styles["check-switch"]}
                            />
                            {item.editable && (
                              <span className={styles["st1"]}>Editable</span>
                            )}
                            {!item.editable && (
                              <span className={styles["st1"]}>
                                Non Editable
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            <div>
              {" "}
              <AddModal
                isOpen={modalShow}
                showModalHandler={showModalHandler}
                getFolder={getFolderData}
              />
              <MoveTo
                isOpen={MoveToModal}
                showModalHandler={movetohandler}
                Folderid={FolderID}
                getFolder={getFolderData}
              />
              <ChangeColorModal
                Folderid={FolderID}
                isOpen={ChangecolorModal}
                showModalHandler={changecolorhandler}
                getFolder={getFolderData}
              />
              <RenameModal
                Folderid={FolderID}
                isOpen={Renamemodal}
                showModalHandler={renamehnadler}
                getFolder={getFolderData}
              />
              <GroupFile
                isOpen={Groupfile}
                Folderid={FolderID}
                showModalHandler={groupfilehandler}
                getFolder={getFolderData}
              />
            </div>
            {showDropdown && props.type === "UNARCHIVED" ? (
              <div
                className={styles["custom-menu"]}
                style={{ top: `${400 + yPosition}px`, left: `${xPosition}px` }}
              >
                {actions.map((item) => (
                  <div
                    key={item.name}
                    className={styles["action"]}
                    onClick={item.onClick}
                  >
                    <div className={styles["icn"]}>
                      <Image
                        src={item.src}
                        alt=""
                        className={styles["image"]}
                      />
                    </div>
                    <span className={styles["txt"]}>{item.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      {postTable && <PostData postid={postId} />}
    </div>
  );
}