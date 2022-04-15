import { FC, KeyboardEventHandler, MouseEventHandler, useState} from "react";

import styles from './LabelItem.module.css';
import clsx from "clsx";
import { sidebarSvg } from 'constant/sidebarSvg';
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { Label } from "types/labelType";

interface Props {
    labelItem: Label,
    isSelected: boolean,
    deleteLabel: () => void,
    selectLabel: () => void,
    updateLabel: (updatedItem: string, updatedValue: string, id: string) => void,
}

const LabelItem: FC<Props> = ({labelItem, isSelected,  deleteLabel, selectLabel, updateLabel}) => {

    const {_id, label, colour } = labelItem;

    const [isEditLabelFormOpen, setEditLabelForm] = useState(false);
    const [isEditable, setEditable] = useState(false);
    const [inputValue, setInputValue] = useState(label);


    const selectColor = (color: string) => {
        updateLabel("colour", color, _id);
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
            updateLabel("label", inputValue, _id);
            setEditable(false);
        }   
    }

    let className = isSelected ? clsx(styles["LabelItem"], styles["Selected"]) : styles["LabelItem"];

    return (
        <div className="LabelItem-Overlay">
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
                    onClick={selectLabel} 
                    style={{backgroundColor: `${colour}`}} 
                    onContextMenu={showEditLabelForm}>
                {label}{isSelected && <span onClick={deleteLabel}>{sidebarSvg["CLOSE"]}</span>} 
                </div>}
                {isEditLabelFormOpen && <ColorPicker deleteLabel={deleteLabel} selectColor={selectColor} editInput={editInput} />}
        </li>
        </div>
        
    )          
}



export default LabelItem;