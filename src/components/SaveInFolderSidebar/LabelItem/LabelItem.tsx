import { FC, KeyboardEventHandler, MouseEventHandler, useState } from "react";

import styles from './LabelItem.module.css';
import clsx from "clsx";
import { sidebarSvg } from 'constant/sidebarSvg';
import { ColorPicker } from "../ColorPicker/ColorPicker";

interface Props {
    title: string,
    color: string,
    deleteLabel: () => void,
    setSelectedLabel: () => void,
    isSelected: boolean,
    id: number,
    updateLabel: (title: string, id: number) => void,
    updateLabelColor: (id: number, color: string) => void,
}

const LabelItem: FC<Props> = ({title, setSelectedLabel, isSelected, id, deleteLabel, updateLabel, updateLabelColor, color}) => {

    const [isEditLabelFormOpen, setEditLabelForm] = useState(false);
    const [isEditable, setEditable] = useState(false);
    const [inputValue, setInputValue] = useState(title);

    const selectColor = (color: string) => {
        updateLabelColor(id, color);
    }

    const showEditLabelForm: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setEditLabelForm(true);
    }

    const editInput = () => {
        setEditable(true);
    }

    const saveOnEnter: KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Enter') {
            updateLabel(inputValue, id);
            setEditable(false);
        }   
    }

    let className = isSelected ? clsx(styles["LabelItem"], styles["Selected"]) : styles["LabelItem"];

    return (
        <>
        <li className={styles["LabelItem-Wrapper"]}>
            {isEditable ? 
                <input 
                    value={inputValue} 
                    className={styles["LabelInput"]} 
                    maxLength={20} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyUp={saveOnEnter} 
                /> : 
                <div 
                    className={className} 
                    onClick={setSelectedLabel} 
                    style={{backgroundColor: `${color}`}} 
                    onContextMenu={showEditLabelForm}>
                {title}{isSelected && <span onClick={deleteLabel}>{sidebarSvg["CLOSE"]}</span>} 
                </div>}
                {isEditLabelFormOpen && <ColorPicker deleteLabel={deleteLabel} selectColor={selectColor} editInput={editInput} />}
        </li>
        
        </>
        
    )          
}

export default LabelItem;