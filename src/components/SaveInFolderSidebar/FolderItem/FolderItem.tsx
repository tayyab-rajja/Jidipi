import { FC } from 'react';

import clsx from 'clsx';
import styles from './FolderItem.module.css';
interface Props {
    folderName: string,
    handleClickItem: () => void,
    isSelected: boolean
}

const FolderItem: FC<Props> = ({folderName, handleClickItem, isSelected}) => { 

    let className = isSelected ? clsx(styles["Sidebar-FolderItem"], styles["Choosen"]) : styles["Sidebar-FolderItem"];

    return (
        <li className={className} onClick={handleClickItem}>
            <span className={styles["Sidebar-FolderItem_Text"]}>
                {folderName}
            </span>
            <span className={styles["Sidebar-FolderItem_Icon"]}>
                {/* Icon to be added */}
            </span>
        </li>
    )
}

export default FolderItem;