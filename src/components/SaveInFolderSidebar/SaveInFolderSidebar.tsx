import { sidebarSvg } from "constant/sidebarSvg";
import { FC, useState } from "react";
import SideBarWrapper from "../SideBarWrapper/SideBarWrapper";
import AddLabelForm from "./AddLabelForm/AddLabelForm";
import FolderItem from "./FolderItem/FolderItem";
import LabelItem from "./LabelItem/LabelItem";
import { PageFolder } from "types/pageFolderType";

import styles from './SaveInFolderSidebar.module.css';
import { useSavePost } from "src/api/useSavePost";
import { useLabels } from "src/api/useLabels";
import { useCreateLabels } from "src/api/useCreateLabels";
import { Label } from "types/labelType";

type showElementState = {
    addLabelBtn: boolean,
    addLabelFormAndList: boolean
}
interface LabelItem {
    title: string,
    isSelected: boolean,
    id: string,
    color: string
}
type labelsListState = LabelItem[];

interface Props {
    pageFolders: PageFolder[],
    currentPageFolder: string,
    postId: string
}

export const SaveInFolderSidebar: FC<Props> = ({pageFolders, currentPageFolder, postId}) => {

    const [showElement, setShowElement] = useState<showElementState>({
        addLabelBtn: false,
        addLabelFormAndList: false,
    });
    const [selectedFolder, setSelectedFolder] = useState('');
    const [labelsList, setLabelsList] = useState<labelsListState>([]);
    const pageFoldersPP = pageFolders?.filter(pageFolder => pageFolder.pageType === "PROJECT" || pageFolder.pageType === "PRODUCT");
    const activePageFolders = [currentPageFolder, "Mine"];

    const {savePost} = useSavePost();
    const {data, error} = useLabels();
    const {createLabel} = useCreateLabels();
    const pageFolderId = "603ce60958c5c6279bc2ed96";
   
    const handleClickItem = (elementName: string, title?: string) => {
        if(title && !activePageFolders.includes(title)) {
            return
        }
        title && setSelectedFolder(title);
        setShowElement({
            ...showElement,
            [elementName]: true,
        });
    }

    const cancelAllSelected = () => {
        setSelectedFolder('');
            setShowElement({
                addLabelBtn: false,
                addLabelFormAndList: false,
            }); 
    }

    const createLabelP = (labelName: string) => {
        const defaultColor = "F1F1F1"
        createLabel(labelName, defaultColor, "PROJECT");
    }

    const updateLabel = (labelName: string, id: string) => {
        setLabelsList(prevState => prevState.map(
            labelsName => labelsName.id === id ? {...labelsName, title: labelName} : {...labelsName}
        ))
    }
    
    const updateLabelColor = (id: string, color: string) => {
        setLabelsList(prevState => prevState.map(
            labelsName => labelsName.id === id ? {...labelsName, color} : {...labelsName}
        ))
    }

    const cancelSelectedFolder = (title:string) => {
        if (title === selectedFolder) {
            setSelectedFolder('');
            setShowElement({
                addLabelBtn: false,
                addLabelFormAndList: false,
            });   
        }
    }

    const setSelectedLabel = (title: string) => {
        setLabelsList((prevState) => prevState.map(
            (labelItem) => labelItem.title === title ? {...labelItem, isSelected: true} : {...labelItem, isSelected: false})
        )
    }

    const deleteLabel = (title: string) => {
        setLabelsList((prevState) => prevState.filter(
            labelsName => labelsName.title !== title 
        ))
    }

    return (
        <SideBarWrapper>
            <div className={styles["Sidebar"]}>
            <div>
                <div className={`${styles["Sidebar-Title"]} ${styles["Text"]}`}>save in folder</div>
                <ul className={styles["Sidebar-Folders"]}>
                    {pageFoldersPP?.map(({title, _id}) => 
                        <FolderItem 
                            key={_id} 
                            folderName={title} 
                            handleClickItem={() => handleClickItem('addLabelBtn', title)} 
                            isSelected={title === selectedFolder ? true : false}
                            cancelSelectedFolder={() => cancelSelectedFolder(title)}
                            activeFolders={activePageFolders} 
                        />)}
                </ul>
                {showElement.addLabelBtn && <div className={`${styles["Sidebar-Button"]} ${styles["Text"]}`} onClick={() => handleClickItem('addLabelFormAndList')}>add label</div>} 
            </div>
            {showElement.addLabelFormAndList && 
                <div>
                        <ul className={styles["LabelsList"]}>
                        {data && data.labels.map((item: Label) => 
                                <LabelItem 
                                title={item.label}
                                id={item._id}
                                key={item._id} 
                                color={item.colour}
                                updateLabelColor={updateLabelColor}
                                setSelectedLabel={() => setSelectedLabel(item.label)} 
                                deleteLabel={() => deleteLabel(item._id)}
                                updateLabel={updateLabel} 
                                // isSelected={label.isSelected} 
                            />
                            )}
                        </ul>
                    <AddLabelForm createLabel={createLabelP} />
                </div>
            }
            {showElement.addLabelBtn && 
                <div className={styles["AddLabelForm-ButtonWrapper"]}>
                    <button className={styles["AddLabelForm-InputWrapper_Button"]} onClick={cancelAllSelected}>
                        {sidebarSvg["CANCEL"]}Cancel
                    </button>
                    <button className={styles["AddLabelForm-InputWrapper_Button"]} onClick={() => savePost(postId, pageFolderId)}>
                        {sidebarSvg["CONFIRM"]}Confirm
                    </button>
                </div>
            }
        </div>
        </SideBarWrapper>
    )
}

