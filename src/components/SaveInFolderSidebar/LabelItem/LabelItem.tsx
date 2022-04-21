import { FC, KeyboardEventHandler, MouseEventHandler, useState} from "react";
import clsx from "clsx";

import { Label } from "types/labelType";
import { sidebarSvg } from 'constant/sidebarSvg';

import { ColorPicker } from "../ColorPicker/ColorPicker";

import styles from './LabelItem.module.css';

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

    const zIndex = isEditLabelFormOpen ? {zIndex: 25} : {zIndex: 0};

    return (
        <>
        {isEditLabelFormOpen && <div className={styles["LabelItem-Overlay"]} onClick={() => setEditLabelForm(false)}></div>}
        <li className={styles["LabelItem-Wrapper"]} style={zIndex}>
            {isEditable ? 
                <input 
                    value={inputValue} 
                    className={styles["LabelInput"]} 
                    maxLength={20} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyUp={saveOnEnter} 
                /> : 
                <div 
                    className={clsx(styles["LabelItem"], isSelected && styles["Selected"])} 
                    onClick={selectLabel} 
                    style={{backgroundColor: `${colour}`}} 
                    onContextMenu={showEditLabelForm}>
                {label}{isSelected && <span onClick={deleteLabel}>{sidebarSvg["CLOSE"]}</span>} 
                </div>}
                {isEditLabelFormOpen && <ColorPicker deleteLabel={deleteLabel} selectColor={selectColor} editInput={editInput} />}
        </li>
        </>
    )          
}



export default LabelItem;