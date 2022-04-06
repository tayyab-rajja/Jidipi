import { FC } from "react";

import styles from './LabelItem.module.css';
import clsx from "clsx";
import { sidebarSvg } from 'constant/sidebarSvg';

interface Props {
    title: string,
    deleteLabel: () => void,
    setSelectedLabel: () => void,
    isSelected: boolean
}

const LabelItem: FC<Props> = ({title, setSelectedLabel, isSelected, deleteLabel}) => {

    let className = isSelected ? clsx(styles["LabelItem"], styles["Selected"]) : styles["LabelItem"];

    return (
        <li className={styles["LabelItem-Wrapper"]} onClick={setSelectedLabel}>
            <div className={className}>{title}
            {isSelected && <span onClick={deleteLabel}>{sidebarSvg["CLOSE"]}</span>} 
            </div>
        </li>
    )
}

export default LabelItem;