import { FC, useState } from "react";
import AddLabelForm from "./AddLabelForm/AddLabelForm";
import FolderItem from "./FolderItem/FolderItem";

import styles from './SaveInFolderSidebar.module.css';

export const SaveInFolderSidebar: FC = () => {

    const [showItem, setShowItem] = useState({
        showAddLabelBtn: false,
        showAddLabelForm: false
    });

    const labels = ["Architectures", "Interiors", "Construction", "Electronics", "Furniture", "Goods", "Mine"];

    const displayItem = (item: string) => {
        setShowItem({
            ...showItem,
            [item]: true
        })
    }

    const hideItem = (item: string) => {
        setShowItem({
            ...showItem,
            [item]: false
        })
    }

    return (
        <div className={styles["Sidebar"]}>
            <div>
                <div className={`${styles["Sidebar-Title"]} ${styles["Text"]}`}>save in folder</div>
                <ul className={styles["Sidebar-Folders"]}>
                    {labels.map((label, i) => <FolderItem key={i} label={label} displayAddLabelBtn={displayItem} />)}
                </ul>
                {showItem.showAddLabelBtn && <div className={`${styles["Sidebar-Button"]} ${styles["Text"]}`} onClick={() => displayItem('showAddLabelForm')}>add label</div>} 
            </div>
            {showItem.showAddLabelForm && <AddLabelForm hideItem={hideItem} />}
        </div>
    )
}