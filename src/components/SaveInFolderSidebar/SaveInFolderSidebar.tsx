import { FC, useState } from "react";
import AddLabelForm from "./AddLabelForm/AddLabelForm";
import FolderItem from "./FolderItem/FolderItem";

import styles from './SaveInFolderSidebar.module.css';

export const SaveInFolderSidebar: FC = () => {

    const [showAddLabelBtn, setShowAddLabelBtn] = useState(false);
    const [showAddLabelForm, setShowAddLabelForm] = useState(false);
    
    const labels = ["Architectures", "Interiors", "Construction", "Electronics", "Furniture", "Goods", "Mine"];

    const displayAddLabelBtn = () => {
        setShowAddLabelBtn(true);
    }

    const displayAddLabelForm = () => {
        setShowAddLabelForm(true);
    }

    const addLabelButton = showAddLabelBtn ? <div className={`${styles["Sidebar-Button"]} ${styles["Text"]}`} onClick={displayAddLabelForm}>add label</div> : null;
    const addLabelForm = showAddLabelForm ? <AddLabelForm /> : null;

    return (
        <div className={styles["Sidebar"]}>
            <div>
                <div className={`${styles["Sidebar-Title"]} ${styles["Text"]}`}>save in folder</div>
                <ul className={styles["Sidebar-Folders"]}>
                    {labels.map((label, i) => <FolderItem key={i} label={label} displayAddLabelBtn={displayAddLabelBtn} />)}
                </ul>
                {addLabelButton} 
            </div>
            {addLabelForm}
        </div>
    )
}