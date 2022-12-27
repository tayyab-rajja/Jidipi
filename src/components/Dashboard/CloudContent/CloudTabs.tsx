import React, { useState, useEffect, useCallback, useContext } from "react";
import styles from "src/components/Dashboard/CloudContent/CloudContent.module.css";
// import Form from "react-bootstrap/Form";
import fileIcon from "public/dashboard/cloud/images/jpg-file.png";
import Image from "next/image";
import ArrowUp from "public/dashboard/cloud/images/arrow-up.png";
import ArrowDown from "public/dashboard/cloud/images/arrow-down.png";
import IconLens from "public/dashboard/cloud/images/icon-lens.png";
import folderIcon from "public/dashboard/cloud/images/folder-icon.png";
// import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
// import ToggleButton from "react-bootstrap/ToggleButton";
import iconColor from "public/dashboard/cloud/images/icon-colour.png";
import deleteIcon from "public/dashboard/cloud/images/Delete-icon.png";
import downloadIcon from "public/dashboard/cloud/images/icon-download.png";
import editIcon from "public/dashboard/cloud/images/Edit-icon.png";
import starIcon from "public/dashboard/cloud/images/star-frame-icon-filled.png";
import starFrame from "public/dashboard/cloud/images/start-frame-icon.png";
import groupIcon from "public/dashboard/cloud/images/icon-group.png";
import folderMove from "public/dashboard/cloud/images/Folder-Move-icon.png";
import copyIcon from "public/dashboard/cloud/images/icon-copy.png";
import blankIcon from "public/dashboard/cloud/images/creator-blank.png";
import unstar from "public/dashboard/cloud/images/start-frame-icon.png";
import stared from "public/dashboard/cloud/images/star-frame-icon-filled.png";
// import Table from "react-bootstrap/Table";
import AddModal from "./AddModal/AddModal";
import axios from "axios";
import MoveTo from "./MoveToModal/MoveTo";
import ChangeColorModal from "./ChangeColor/ChangeColorModal";
import RenameModal from "./RenameModal/RenameModal";
import GroupFile from "./GroupFile/GroupFile";
import token from "./Config/Token";
import { UserContext } from "../../../providers/UserProvider";
import { useRouter } from "next/router";
import { PUT } from "../../../lib/common/api";
import { GET } from "../../../lib/common/api";
import { DELETE } from "../../../lib/common/api";
import TableHeader from "./Table/TableHeader";
import PostData from "./Table/PostData";
import EditableModal from "./EditableModal/EditableModal";
import { formatFileSize } from "src/utils/common";
export default function CloudTabs(props: any) {
  //global state
  const userContext: any = useContext(UserContext);

  // const user = userContext.user;
  // console.log("user", user);
  let user = { companyId: "615b101e899dd8828faf0547" };
  // local state
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPage, setshowPage] = useState(false);
  const [toggleValue, settoggleValue] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [editableModal, seteditableModal] = useState(false);
  const [xPosition, setxPosition] = useState("");
  const [yPosition, setyPosition] = useState("");
  const [FolderData, setFolderData] = useState<any[]>([]);
  const [parentFolderID, setparentFolderID] = useState("");
  const [FilterFolderData, setFilterFolderData] = useState<any[]>([]);
  const [first, setfirst] = useState("");
  const [toggleBlakColor, settoggleBlakColor] = useState(false);
  const [MoveToModal, setMoveToModal] = useState(false);
  const [ChangecolorModal, setChangecolorModal] = useState(false);
  const [Renamemodal, setRenamemodal] = useState(false);
  const [Groupfile, setGroupfile] = useState(false);
  const [FolderID, setFolderID] = useState("");
  const [moveableFolderId, setmoveableFolderId] = useState("");
  const [Category, setCategory] = useState("UNARCHIVED");
  const [SearchValue, setSearchValue] = useState("");
  const [SearchTerm, setSearchTerm] = useState("");
  const [postTable, setpostTable] = useState(false);
  const [postId, setpostId] = useState("");
  const [PagesList, setPagesList] = useState<any[]>([]);
  const [SubFolder, setSubFolder] = useState(false);
  const [GroupFilesArray, setGroupFilesArray] = useState<any[]>([]);
  const [SelectColor, setSelectColor] = useState(false);
  const [FolderItemId, setFolderItemId] = useState("");

  let fileArray: any = [];

  //dfdfdfdf
  const router = useRouter();
  const type = router.query.type;

  const CDN_URL = process.env.CDN_URL ?? "https://upload.jidipi.com";

  const categoryhandler = (event: any) => {
    setCategory(event.target.value);
  };
  const searchHandler = (event: any) => {
    console.log("keyyyy", event.target.value);
    setSearchValue(event.target.value);
  };
  const searchSubmitHandler = (event: any) => {
    event.preventDefault();
    console.log("submitteed", SearchValue);
    setSearchTerm(SearchValue);
    if (SearchValue !== null) {
      setFilterFolderData(
        FolderData.filter((o) => {
          if (o.name) {
            return o.name.includes(SearchValue);
          }
        })
      );
    } else {
      setFilterFolderData(FolderData);
    }
  };

  const getParentId = (pid: any) => {
    console.log("pid", pid);
    setparentFolderID(pid);
  };
  const moveToPages = (id: any) => {
    console.log("pagesid", id);
    setmoveableFolderId(id);
  };

  const editChangeHandler = (event: any, item: any) => {
    console.log("item", item);
    setFolderItemId(item);
    if (event.target.checked) {
      seteditableModal(!editableModal);
    }
  };
  const showDropdownhandler = (e: any, item: any) => {
    e.preventDefault();
    if (props.type === "UNARCHIVED" && !item.isSpecial) {
      //setCoordinates(e.clientX, e.clientY);
      setxPosition(e.clientX);
      setyPosition(e.clientY);
      // setGroupFilesArray(fileArray);
      setFolderID(item._id);
      console.log("item", item);
      setShowDropdown(true);
    }
  };
  const GroupFolderhandler = () => {
    const res = PUT(`/company/${user.companyId}/group`, {
      files: GroupFilesArray,
    });
    res.then((res) => {
      getFolderData();
    });
  };
  const trashRestoredocumenthandler = () => {
    const res = PUT(`/company/${FolderID}/document`, {
      action: SubFolder ? "restore" : "trash",
    });
    res.then((res) => {
      console.log(res.data);
      getFolderData();
    });
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

  const showModalHandler = () => {
    setModalShow(!modalShow);
  };
  const editableModalHandler = () => {
    seteditableModal(!editableModal);
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

  const getChatTeashFoldersId = (item: any) => {
    if (props.type === "POST") {
      console.log("postid", item._id);
      setpostId(item._id);
      setpostTable(true);
    } else if (props.type === "UNARCHIVED" && !item.isSpecial) {
      setSelectColor(!SelectColor);
      //setGroupFilesArray([]);
      if (!GroupFilesArray.includes(item._id)) {
        GroupFilesArray.push(item._id);
        console.log(GroupFilesArray);
      } else {
        // GroupFilesArray.pop();
        const index = GroupFilesArray.indexOf(item._id);
        if (index > -1) {
          GroupFilesArray.splice(index, 1);
        }
        console.log(GroupFilesArray);
      }
    }
    console.log("files array", fileArray);
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
      onClick: () => GroupFolderhandler(),
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
    }
    // {
    //   name: "Trash/Restore",
    //   onClick: () => trashRestoredocumenthandler(),
    //   src: deleteIcon,
    // },
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
  }, [handleClick]);
  const getFolderData = useCallback(() => {
    const res = GET(
      `/company/${user.companyId}/folders?categoryType=${props.type}&folderType=FOLDER`
    );
    res.then((res) => {
      console.log("response", res.folders);
      // setFolderData([]);

      setFilterFolderData(res.folders);
      setFolderData(res.folders);

      //console.log("folder data", FolderData);
    });
  }, [user.companyId, props.type]);
  console.log("filterdata", FilterFolderData);
  const getPagesData = useCallback(() => {
    const res = GET(`/pages`);
    res.then((result) => {
      console.log("response", result);
      setPagesList(result.pageFolders);
    });
  }, []);

  useEffect(() => {
    console.log("props type", props.type);
    // setFolderData([]);
    // setFilterFolderData([]);
    setpostTable(false);
    getFolderData();
    getPagesData();
  }, [props.type, getFolderData]);

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
                    {FilterFolderData.map((item) => (
                      <tr
                        key={item._id}
                        className={styles["body-row"]}
                        onContextMenu={() => showDropdownhandler(event, item)}
                        onClick={() => getChatTeashFoldersId(item)}
                      >
                        <td className={styles["tbdy-row"]}>
                          {item.folderType === "FOLDER" ? (
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
                                fill={item.color || "#C5C5C5"}
                              />
                            </svg>
                          ) : (
                            <Image src={fileIcon} alt="" />
                          )}

                          <sup className={styles["sup1"]}>
                            {item.name ? item.name : ""}
                          </sup>
                          {!item.isStar && (
                            <div className={styles["star"]}>
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
                                {item.createdBy
                                  ? item.createdBy.memberType
                                  : ""}
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

                        <td>
                          <div className={styles["mod"]}>
                            {item.updatedAt.substring(0, 10)}
                          </div>
                        </td>
                        <td>
                          <div className={styles["volume"]}>
                            {formatFileSize(item.size)}
                          </div>
                        </td>

                        <td className="" onClick={() => moveToPages(item._id)}>
                          <div className={styles["page-input"]}>
                            <div>
                              <select
                                name="cars"
                                id="cars"
                                className={styles["dropdown"]}
                                onChange={(event) =>
                                  getParentId(event.target.value)
                                }
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
                        </td>
                        <td>
                          <div className={styles["switch-x-outer"]}>
                            <input
                              type="checkbox"
                              //defaultChecked={toggleValue}
                              onChange={() => editChangeHandler(event, item)}
                              //value={"true"}
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
              {/* <GroupFile
                isOpen={Groupfile}
                Folders={GroupFilesArray}
                showModalHandler={groupfilehandler}
                getFolder={getFolderData}
              /> */}
              <EditableModal
                isOpen={editableModal}
                showModalHandler={editableModalHandler}
                getFolder={getFolderData}
                FolderItemid={FolderItemId}
              />
            </div>
            {showDropdown && props.type === "UNARCHIVED" ? (
              <div
                className={styles["custom-menu"]}
                style={{ top: `${30 + yPosition}px`, left: `${xPosition}px` }}
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
