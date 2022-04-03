import { FC, useState } from "react";
import AddLabelForm from "./AddLabelForm/AddLabelForm";
import FolderItem from "./FolderItem/FolderItem";

import styles from './SaveInFolderSidebar.module.css';

const defaultFolderNames = [
    {
        title: "Architectures",
        isSelected: false,
    },
    {
        title: "Interiors",
        isSelected: false,
    },
    {
        title: "Construction",
        isSelected: false,
    },
    {
        title: "Electronics",
        isSelected: false,
    },
    {
        title: "Furniture",
        isSelected: false,
    },
    {
        title: "Goods",
        isSelected: false,
    },
    {
        title: "Mine",
        isSelected: false,
    },
]

export const SaveInFolderSidebar: FC = () => {

    const [showElement, setShowElement] = useState({
        addLabelBtn: false,
        addLabelForm: false,
    });

    const [folderNames, setFolderNames] = useState(defaultFolderNames);

    const handleClickItem = (elementName: string, title?: string) => {
        if (title) {
            setFolderNames((prevState) => prevState.map(
                (folderName) => folderName.title === title ? {...folderName, isSelected: true} : {...folderName, isSelected: false})
            )
        }
        setShowElement({
            ...showElement,
            [elementName]: true,
        });

    }

    const hideAddLableForm = (elementName: string) => {
        setShowElement({
            ...showElement,
            [elementName]: false
        })
    }

    const cancelSelectedFolder = (title:string, isSelected:boolean) => {
        if (!isSelected) {
            return
        }
        setFolderNames((prevState) => prevState.map(
            (folderName) => folderName.title === title ? {...folderName, isSelected: false} : {...folderName})
        )
        setShowElement({
            addLabelBtn: false,
            addLabelForm: false,
        });   
    }

    return (
        <div className={styles["Sidebar"]}>
            <div>
                <div className={`${styles["Sidebar-Title"]} ${styles["Text"]}`}>save in folder</div>
                <ul className={styles["Sidebar-Folders"]}>
                    {folderNames.map(({title, isSelected}, i) => 
                        <FolderItem 
                            key={i} 
                            folderName={title} 
                            handleClickItem={() => handleClickItem('addLabelBtn', title)} 
                            isSelected={isSelected}
                            cancelSelectedFolder={() => cancelSelectedFolder(title, isSelected)} 
                        />)}
                </ul>
                {showElement.addLabelBtn && <div className={`${styles["Sidebar-Button"]} ${styles["Text"]}`} onClick={() => handleClickItem('addLabelForm')}>add label</div>} 
            </div>
            {showElement.addLabelForm && <AddLabelForm hideAddLableForm={() => hideAddLableForm('addLabelForm')} />}
        </div>
    )
}