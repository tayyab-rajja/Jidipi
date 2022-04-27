import { FC, useState } from "react";
import { useRouter } from "next/router";

import { useSavePost } from "src/api/useSavePost";
import { useLabels } from "src/api/useLabels";
import { usePageFolders } from "src/api/usePageFolders";
import { usePageFolderByName } from "src/api/usePageFolderByName";
import { useIsPostInUserFavorites } from "src/api/useIsPostInUserFavorites";

import { sidebarSvg } from "constant/sidebarSvg";
import { Label } from "types/labelType";

import SideBarWrapper from "../SideBarWrapper/SideBarWrapper";
import AddLabelForm from "./AddLabelForm/AddLabelForm";
import FolderItem from "./FolderItem/FolderItem";
import LabelItem from "./LabelItem/LabelItem";

import styles from "./SaveInFolderSidebar.module.css";

interface Props {
  postId: string,
  handleClose: () => void,
}

export const SaveInFolderSidebar: FC<Props> = ({ postId, handleClose }) => {
  const { data } = usePageFolders();
  const { labelsList, createLabel, updateLabel, deleteLabel } = useLabels();
  const { addPostToFavourites } = useSavePost();
  const { mutate } = useIsPostInUserFavorites(postId);

  const { query } = useRouter();
  const currentPageFolder = query.folder;
  const { data: pageFolder } = usePageFolderByName(
    (query.folder as string) ?? null
  );

  const [showLabelsFlow, setShowLabelsFlow] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [error, setError] = useState("");

  const pageFolders = data?.filter(
    (pageFolder) =>
      pageFolder.pageType === "PROJECT" || pageFolder.pageType === "PRODUCT"
  );
  const pageFolderId = pageFolder?._id;
  const activePageFolders = [currentPageFolder, "mine"];

  const selectFolder = (title: string) => {
    if (activePageFolders.includes(title)) {
      setSelectedFolder(title);
    }
  };

  const cancelSelectedFolder = (title: string) => {
    if (title === selectedFolder) {
      setSelectedFolder("");
      setShowLabelsFlow(false);
    }
  };

  const cancelAllSelected = () => {
    setSelectedFolder("");
    setSelectedLabel("");
    setShowLabelsFlow(false);
  };

  const selectLabel = (id: any) => {
    setSelectedLabel(id);
  };

  const addNewLabel = (labelName: string) => {
    createLabel({
      label: labelName,
      colour: "F1F1F1",
      pageType: "PROJECT",
    });
  };

  const savePostToFavorites = async () => {
    const isMine = selectedFolder === 'mine' ? {mine: true} : {pageFolderId};
    const postData = selectedLabel
      ? { postId, label: selectedLabel, ...isMine }
      : { postId, ...isMine };

    await addPostToFavourites(postData);
    mutate();
    handleClose();
  };

  const cancelSelectedLabel = () => {
      setSelectedLabel("");
  }

  const changeLabel = (updatedValue: string, updatedItem: string, id: string) => {
    const updatedLabel = labelsList.filter((labelItem: Label) => labelItem._id === id)[0];
    updateLabel({...updatedLabel, [updatedValue]: updatedItem});
  }

  const removeLabel = async (id: string) => {
    const response = await deleteLabel(id);
    if (response) {
      setError("This label links with Posts!");
    } 
  }

  return (
    <SideBarWrapper>
      <div className={styles["Sidebar"]}>
        <div>
          <div className={`${styles["Sidebar-Title"]} ${styles["Text"]}`}>
            save in folder
          </div>
          <ul className={styles["Sidebar-Folders"]}>
            {pageFolders?.map(({ title, _id }) => (
              <FolderItem
                key={_id}
                folderName={title}
                selectFolder={() => selectFolder(title)}
                isSelected={title === selectedFolder}
                isActive={activePageFolders.includes(title)}
                cancelSelectedFolder={() => cancelSelectedFolder(title)}
              />
            ))}
            <FolderItem
              folderName="Mine"
              selectFolder={() => setSelectedFolder("mine")}
              isSelected={"mine" === selectedFolder}
              isActive={activePageFolders.includes("mine")}
              cancelSelectedFolder={() => cancelSelectedFolder("mine")}
            />
          </ul>
          {selectedFolder && (
            <div
              className={`${styles["Sidebar-Button"]} ${styles["Text"]}`}
              onClick={() => setShowLabelsFlow(true)}
            >
              add label
            </div>
          )}
        </div>
        {showLabelsFlow && (
          <div>
            <ul className={styles["LabelsList"]}>
              {labelsList?.map((label: Label) => (
                <LabelItem
                  key={label._id}
                  labelItem={label}
                  updateLabel={changeLabel}
                  deleteLabel={() => removeLabel(label._id)}
                  error={error}
                  setError={setError}
                  isSelected={label._id === selectedLabel}
                  selectLabel={() => selectLabel(label._id)}
                  cancelSelectedLabel={cancelSelectedLabel}
                />
              ))}
            </ul>
            <AddLabelForm addNewLabel={addNewLabel} />
          </div>
        )}
        {selectedFolder && (
          <div className={styles["AddLabelForm-ButtonWrapper"]}>
            <button
              className={styles["AddLabelForm-InputWrapper_Button"]}
              onClick={cancelAllSelected}
            >
              {sidebarSvg["CANCEL"]}Cancel
            </button>
            <button
              className={styles["AddLabelForm-InputWrapper_Button"]}
              onClick={savePostToFavorites}
            >
              {sidebarSvg["CONFIRM"]}Confirm
            </button>
          </div>
        )}
      </div>
    </SideBarWrapper>
  );
};
