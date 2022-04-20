import { FC, useState } from "react";
import { useRouter } from "next/router";

import { useSavePost } from "src/api/useSavePost";
import { useLabels } from "src/api/useLabels";
import { usePageFolders } from "src/api/usePageFolders";
import { usePageFolderByName } from "src/api/usePageFolderByName";

import { sidebarSvg } from "constant/sidebarSvg";
import { Label } from "types/labelType";

import SideBarWrapper from "../SideBarWrapper/SideBarWrapper";
import AddLabelForm from "./AddLabelForm/AddLabelForm";
import FolderItem from "./FolderItem/FolderItem";
import LabelItem from "./LabelItem/LabelItem";

import styles from './SaveInFolderSidebar.module.css';

type showElementsState = {
    addLabelBtn: boolean,
    addLabelFormAndList: boolean
}
interface Props {
    postId: string
}

export const SaveInFolderSidebar: FC<Props> = ({postId}) => {
    const { data } = usePageFolders();
    const { labelsList, isValidating, createLabel, deleteLabel, updateLabel } = useLabels();
    const { addPostToFavourites } = useSavePost();

    const { query } = useRouter();
    const currentPageFolder = query.folder;
    const {data: pageFolder} = usePageFolderByName((query.folder as string) ?? null);

    const [showElements, setShowElements] = useState<showElementsState>({
        addLabelBtn: false,
        addLabelFormAndList: false,
    });
    const [selectedFolder, setSelectedFolder] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('');

    const pageFolders = data?.filter(pageFolder => pageFolder.pageType === "PROJECT" || pageFolder.pageType === "PRODUCT");
    const pageFolderId = pageFolder?._id;
    const activePageFolders = [currentPageFolder, "Mine"];

    const handleClickItem = (elementName: string, title?: string) => {
        if(title && activePageFolders.includes(title)) {
            setSelectedFolder(title);
        }
        setShowElements({
            ...showElements,
            [elementName]: true,
        });
    }

    const cancelSelectedFolder = (title:string) => {
        if (title === selectedFolder) {
            setSelectedFolder('');
            setShowElements({
                addLabelBtn: false,
                addLabelFormAndList: false,
            });   
        }
    }

    const cancelAllSelected = () => {
        setSelectedFolder('');
            setShowElements({
                addLabelBtn: false,
                addLabelFormAndList: false,
            }); 
    }

    const selectLabel = (id: string) => {
        setSelectedLabel(id);
    }

    const addNewLabel = (labelName: string) => {
        const defaultColor = "F1F1F1";
        createLabel(labelName, defaultColor, "PROJECT");
    }

    const changeLabel = (updatedItem: string, updatedValue: string, id: string) => {
        const updatedLabel = labelsList.labels.filter((labelItem: Label) => labelItem._id === id)[0];
        updateLabel({...updatedLabel, updatedItem: updatedValue});
    }
    
    const removeLabel = (id: string) => {
        deleteLabel(id);
    }

    const savePostToFavorites = () => {
        const postData = {
            postId, 
            pageFolderId, 
            label: selectedLabel
        }
        addPostToFavourites(postData);
    }
 
    return (
        <SideBarWrapper>
            <div className={styles["Sidebar"]}>
            <div>
                <div className={`${styles["Sidebar-Title"]} ${styles["Text"]}`}>save in folder</div>
                <ul className={styles["Sidebar-Folders"]}>
                    {pageFolders?.map(({title, _id}) => 
                        <FolderItem 
                            key={_id} 
                            folderName={title} 
                            handleClickItem={() => handleClickItem('addLabelBtn', title)} 
                            isSelected={title === selectedFolder}
                            isActive={activePageFolders.includes(title)}
                            cancelSelectedFolder={() => cancelSelectedFolder(title)}
                        />)}
                </ul>
                {showElements.addLabelBtn && <div className={`${styles["Sidebar-Button"]} ${styles["Text"]}`} onClick={() => handleClickItem('addLabelFormAndList')}>add label</div>} 
            </div>
            {showElements.addLabelFormAndList && 
                <div>
                    {isValidating && <p>Loading...</p>}
                    <ul className={styles["LabelsList"]}>
                        {labelsList.labels?.map((label: Label) => 
                            <LabelItem
                                key={label._id}
                                labelItem={label}
                                isSelected={label._id === selectedLabel}  
                                updateLabel={changeLabel}
                                deleteLabel={() => removeLabel(label._id)}
                                selectLabel={() => selectLabel(label._id)} 
                            />
                        )}
                    </ul>
                    <AddLabelForm addNewLabel={addNewLabel} />
                </div>
            }
            {showElements.addLabelBtn && 
                <div className={styles["AddLabelForm-ButtonWrapper"]}>
                    <button className={styles["AddLabelForm-InputWrapper_Button"]} onClick={cancelAllSelected}>
                        {sidebarSvg["CANCEL"]}Cancel
                    </button>
                    <button className={styles["AddLabelForm-InputWrapper_Button"]} onClick={savePostToFavorites}>
                        {sidebarSvg["CONFIRM"]}Confirm
                    </button>
                </div>
            }
        </div>
        </SideBarWrapper>
    )
}

