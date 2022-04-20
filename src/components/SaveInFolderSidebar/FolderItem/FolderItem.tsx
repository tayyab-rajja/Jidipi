import { FC, MouseEvent } from 'react';
import clsx from 'clsx';

import { sidebarSvg } from 'constant/sidebarSvg';

import styles from './FolderItem.module.css';
interface Props {
    folderName: string,
    isSelected: boolean,
    isActive: boolean,
    selectFolder: () => void,
    cancelSelectedFolder: () => void,
}

const FolderItem: FC<Props> = ({folderName, selectFolder, isSelected, cancelSelectedFolder, isActive}) => { 

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        cancelSelectedFolder();
    }

    return (
        <li className={clsx(styles["Sidebar-FolderItem"], isActive && styles["Active"], (isActive && isSelected) && styles["Choosen"])} onClick={selectFolder}>
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