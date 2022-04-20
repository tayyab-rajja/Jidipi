import { FC, MouseEventHandler, MouseEvent, useState } from "react";
import clsx from "clsx";

import { sidebarSvg } from "constant/sidebarSvg";
import { colorsList } from "constant/colorsList";

import styles from './ColorPicker.module.css';
    
interface Props {
    deleteLabel: () => void,
    selectColor: (color: string) => void,
    editInput: () => void
}

export const ColorPicker: FC<Props> = ({deleteLabel, selectColor, editInput}) => {

    const [selectedColor, setSelectedColor] = useState('');

    const handleClickItem = (e: MouseEvent, title:string) => {
        selectColor(title);
        setSelectedColor(title);
    }

    const editBtnClick: MouseEventHandler = (e) => {
        editInput()
    }

    return (
            <div className={styles["ColorPicker-Wrapper"]}>
                <div className={styles["ColorPicker-Button"]} onClick={editBtnClick}>
                    {sidebarSvg["EDIT"]}Edit
                </div>
                <ul className={styles["ColorPicker-ColorsList"]}>
                    {colorsList.map((color, i) => 
                        <li 
                            key={i} 
                            className={clsx(styles["ColorPicker-ColorItem"], color === selectedColor && styles["Selected"])} 
                            style={{backgroundColor: `${color}`}} 
                            onClick={(e) => handleClickItem(e, color)}>
                        </li>
                    )}
                </ul>
                <div className={styles["ColorPicker-Button"]} onClick={deleteLabel}>
                    {sidebarSvg["DELETE"]}Delete
                </div>
            </div>
    )
}