import { sidebarSvg } from "constant/sidebarSvg";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import SideBarWrapper from "../SideBarWrapper/SideBarWrapper";
import AddLabelForm from "./AddLabelForm/AddLabelForm";
import FolderItem from "./FolderItem/FolderItem";
import LabelItem from "./LabelItem/LabelItem";

import styles from './SaveInFolderSidebar.module.css';
import { useSavePost } from "src/api/useSavePost";
import { useFetchLabels } from "src/api/useFetchLabels";
import { useLabels } from "src/api/useLabels";
import { usePageFolders } from "src/api/usePageFolders";
import { Label } from "types/labelType";

type showElementState = {
    addLabelBtn: boolean,
    addLabelFormAndList: boolean
}
interface Props {
    postId: string
}

export const SaveInFolderSidebar: FC<Props> = ({postId}) => {
    const { data } = usePageFolders();
    const { labelsList, mutate } = useFetchLabels();
    const { addPostToFavourites } = useSavePost();
    const { createLabel, deleteLabel, updateLabel } = useLabels();
    const router = useRouter();
    const currentPageFolder = router.query.folder;

    const [showElement, setShowElement] = useState<showElementState>({
        addLabelBtn: false,
        addLabelFormAndList: false,
    });
    const [selectedFolder, setSelectedFolder] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('');

    const pageFoldersPP = data?.filter(pageFolder => pageFolder.pageType === "PROJECT" || pageFolder.pageType === "PRODUCT");
    const pageFolderId = data?.filter(pageFolder => pageFolder.title === currentPageFolder)[0]._id;
    const activePageFolders = [currentPageFolder, "Mine"];

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

    const cancelSelectedFolder = (title:string) => {
        if (title === selectedFolder) {
            setSelectedFolder('');
            setShowElement({
                addLabelBtn: false,
                addLabelFormAndList: false,
            });   
        }
    }

    const cancelAllSelected = () => {
        setSelectedFolder('');
            setShowElement({
                addLabelBtn: false,
                addLabelFormAndList: false,
            }); 
    }

    const selectLabel = (id: string) => {
        setSelectedLabel(id);
    }

    const addNewLabel = async (labelName: string) => {
        const defaultColor = "F1F1F1";
        const response = await createLabel(labelName, defaultColor, "PROJECT");
        mutate({...labelsList, response})
    }

    const changeLabel = async (updatedItem: string, updatedValue: string, id: string) => {
        const updatedLabel = labelsList.labels.filter((labelItem: Label) => labelItem._id === id)[0];
        await updateLabel({...updatedLabel, updatedItem: updatedValue});
        mutate({...labelsList});
    }
    
    const removeLabel = async (id: string) => {
        await deleteLabel(id);
        mutate(labelsList.labels.filter((labelItem: Label) => labelItem._id !== id));
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
                            isSelected={title === selectedFolder}
                            cancelSelectedFolder={() => cancelSelectedFolder(title)}
                            activeFolders={activePageFolders} 
                        />)}
                </ul>
                {showElement.addLabelBtn && <div className={`${styles["Sidebar-Button"]} ${styles["Text"]}`} onClick={() => handleClickItem('addLabelFormAndList')}>add label</div>} 
            </div>
            {showElement.addLabelFormAndList && 
                <div>
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
            {showElement.addLabelBtn && 
                <div className={styles["AddLabelForm-ButtonWrapper"]}>
                    <button className={styles["AddLabelForm-InputWrapper_Button"]} onClick={cancelAllSelected}>
                        {sidebarSvg["CANCEL"]}Cancel
                    </button>
                    <button className={styles["AddLabelForm-InputWrapper_Button"]} onClick={() => addPostToFavourites(postId, pageFolderId, selectedLabel)}>
                        {sidebarSvg["CONFIRM"]}Confirm
                    </button>
                </div>
            }
        </div>
        </SideBarWrapper>
    )
}

