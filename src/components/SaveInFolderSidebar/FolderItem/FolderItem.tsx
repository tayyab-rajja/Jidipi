import { FC, MouseEvent } from 'react';

import clsx from 'clsx';
import styles from './FolderItem.module.css';
interface Props {
    folderName: string,
    handleClickItem: () => void,
    isSelected: boolean,
    cancelSelectedFolder: () => void,
}

const FolderItem: FC<Props> = ({folderName, handleClickItem, isSelected, cancelSelectedFolder}) => { 

    let className = isSelected ? clsx(styles["Sidebar-FolderItem"], styles["Choosen"]) : styles["Sidebar-FolderItem"];

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        cancelSelectedFolder();
    }

    return (
        <li className={className} onClick={handleClickItem}>
            <span className={styles["Sidebar-FolderItem_Text"]}>
                {folderName}
            </span>
            <span className={styles["Sidebar-FolderItem_Icon"]} onClick={handleClick}>
                {/* Icon to be added */}
            </span>
        </li>
    )
}

export default FolderItem;