import { FC, useState } from 'react';
import styles from './FolderItem.module.css';

interface Props {
    label: string,
    displayAddLabelBtn: (item: string) => void,
}

const FolderItem: FC<Props> = ({label, displayAddLabelBtn}) => { 

    const [isSelected, setSelected] = useState(false);

    const handleClick = (e) => {
        displayAddLabelBtn('showAddLabelBtn');
        setSelected(true);
    }

    let className = isSelected ? `${styles["Sidebar-FolderItem"]} ${styles["Choosen"]}` : styles["Sidebar-FolderItem"];

    return (
        <li className={className} onClick={handleClick}>
            <span className={styles["Sidebar-FolderItem_Text"]}>
                {label}
            </span>
            <span className={styles["Sidebar-FolderItem_Icon"]}>
                {/* Icon to be added */}
            </span>
        </li>
    )
}

export default FolderItem;