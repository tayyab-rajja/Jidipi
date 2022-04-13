import { FC, MouseEvent } from 'react';

import clsx from 'clsx';
import styles from './FolderItem.module.css';
import { sidebarSvg } from 'constant/sidebarSvg';
interface Props {
    folderName: string,
    handleClickItem: () => void,
    isSelected: boolean,
    cancelSelectedFolder: () => void,
    activeFolders: string[]
}

const FolderItem: FC<Props> = ({folderName, handleClickItem, isSelected, cancelSelectedFolder, activeFolders}) => { 

    let activeClass = activeFolders.includes(folderName) && clsx(styles["Active"]);
    let className = activeFolders.includes(folderName) && isSelected ? clsx(styles["Sidebar-FolderItem"], styles["Choosen"]) : styles["Sidebar-FolderItem"];
    

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        cancelSelectedFolder();
    }

    return (
        <li className={`${className} ${activeClass}`} onClick={handleClickItem}>
            <span className={styles["Sidebar-FolderItem_Text"]}>
                {folderName}
            </span>
            <span className={styles["Sidebar-FolderItem_Icon"]} onClick={handleClick}>
                {isSelected ? sidebarSvg["CLOSE"] : sidebarSvg["STAR"]}
            </span>
        </li>
    )
}

export default FolderItem;