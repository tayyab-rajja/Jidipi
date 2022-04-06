import { FC, KeyboardEventHandler, MouseEventHandler, useState } from "react";

import styles from './LabelItem.module.css';
import clsx from "clsx";
import { sidebarSvg } from 'constant/sidebarSvg';
import { ColorPicker } from "../ColorPicker/ColorPicker";

interface Props {
    title: string,
    deleteLabel: () => void,
    setSelectedLabel: () => void,
    isSelected: boolean,
    id: number,
    updateLabel: (title: string, id: number) => void
}

const LabelItem: FC<Props> = ({title, setSelectedLabel, isSelected, deleteLabel, id, updateLabel}) => {

    const [isEditLabelFormOpen, setEditLabelForm] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [isEditable, setEditable] = useState(false);
    const [inputValue, setInputValue] = useState(title);

    const selectColor = (color: string) => {
        setSelectedColor(color);
    }

    const showEditLabelForm: MouseEventHandler<HTMLLIElement> = (e) => {
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
    let content = isEditable ? 
        <input 
            value={inputValue} 
            className={styles["LabelInput"]} 
            maxLength={20} 
            onChange={(e) => setInputValue(e.target.value)} 
            onKeyUp={saveOnEnter} /> 
        : <div 
            className={className} 
            style={{backgroundColor: `${selectedColor}`}}>
                {title}{isSelected && <span onClick={deleteLabel}>{sidebarSvg["CLOSE"]}</span>} 
        </div>;

    return (
        <li className={styles["LabelItem-Wrapper"]} onClick={setSelectedLabel} onContextMenu={showEditLabelForm}>
            {content}
            {isEditLabelFormOpen && <ColorPicker deleteLabel={deleteLabel} selectColor={selectColor} editInput={editInput} />}
        </li>
    )
}

export default LabelItem;