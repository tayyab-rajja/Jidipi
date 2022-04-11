import { FC, useState } from "react";
import AddLabelForm from "./AddLabelForm/AddLabelForm";
import FolderItem from "./FolderItem/FolderItem";
import LabelItem from "./LabelItem/LabelItem";

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

type showElementState = {
    addLabelBtn: boolean,
    addLabelFormAndList: boolean
}
interface FolderName {
    title: string,
    isSelected: boolean
}
type folderNamesState = FolderName[];

interface LabelItem {
    title: string,
    isSelected: boolean,
    id: number,
    color: string
}
type labelsListState = LabelItem[];


export const SaveInFolderSidebar: FC = () => {

    const [showElement, setShowElement] = useState<showElementState>({
        addLabelBtn: false,
        addLabelFormAndList: false,
    });

    const [folderNames, setFolderNames] = useState<folderNamesState>(defaultFolderNames);
    const [labelsList, setLabelsList] = useState<labelsListState>([]);

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

    const createLabel = (labelName: string) => {
        setLabelsList(labelsList => [...labelsList, {
            title: labelName,
            isSelected: false,
            id: Date.now(),
            color: 'F1F1F1'
        }])
    }

    const updateLabel = (labelName: string, id: number) => {
        setLabelsList(prevState => prevState.map(
            labelsName => labelsName.id === id ? {...labelsName, title: labelName} : {...labelsName}
        ))
    }
    
    const updateLabelColor = (id: number, color: string) => {
        setLabelsList(prevState => prevState.map(
            labelsName => labelsName.id === id ? {...labelsName, color} : {...labelsName}
        ))
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
            addLabelFormAndList: false,
        });   

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
                {showElement.addLabelBtn && <div className={`${styles["Sidebar-Button"]} ${styles["Text"]}`} onClick={() => handleClickItem('addLabelFormAndList')}>add label</div>} 
            </div>
            {showElement.addLabelFormAndList && 
                <div>
                        <ul className={styles["LabelsList"]}>
                        {labelsList.map((label, i) => 
                                <LabelItem 
                                title={label.title}
                                id={label.id}
                                key={i} 
                                color={label.color}
                                updateLabelColor={updateLabelColor}
                                setSelectedLabel={() => setSelectedLabel(label.title)} 
                                deleteLabel={() => deleteLabel(label.title)}
                                updateLabel={updateLabel} 
                                isSelected={label.isSelected} 
                            />
                            )}
                        </ul>
                    <AddLabelForm 
                        hideAddLableForm={() => hideAddLableForm('addLabelFormAndList')} 
                        createLabel={createLabel}
                    />
                </div>
            }
        </div>
    )
}