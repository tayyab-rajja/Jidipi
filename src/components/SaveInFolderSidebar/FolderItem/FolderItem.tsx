import { FC } from 'react';
import styles from './FolderItem.module.css';

interface Props {
    label: string,
    displayAddLabelBtn: (item: string) => void,
}

const FolderItem: FC<Props> = ({label, displayAddLabelBtn}) => { 
    return (
        <li className={styles["Sidebar-FolderItem"]} onClick={() => displayAddLabelBtn('showAddLabelBtn')}>
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