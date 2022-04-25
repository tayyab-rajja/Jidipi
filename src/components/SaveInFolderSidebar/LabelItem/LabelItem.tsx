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
    cancelSelectedLabel: () => void, 
}

const LabelItem: FC<Props> = ({ labelItem, isSelected, deleteLabel, selectLabel, updateLabel, cancelSelectedLabel }) => {

    const {_id, label, colour } = labelItem;

    const [isEditLabelFormOpen, setEditLabelForm] = useState(false);
    
    const [isEditable, setEditable] = useState(false);
    const [inputValue, setInputValue] = useState(label);
    const [error, setError] = useState("");

    const handleInput = (e: any) => {
        setInputValue(e.target.value);
        if (inputValue.length > 20) {
            setError("20 Characters Maximum!");
        } else {
            setError("");
        }
    }

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
        if (e.key === 'Enter' && !error) {
            updateLabel("label", inputValue, _id);
            setEditable(false);
        }   
    }

    const unSelectLabel: MouseEventHandler<HTMLSpanElement> = (e) => {
        e.stopPropagation();
        cancelSelectedLabel();
    }

    const handleOverlay = () => {
        setEditLabelForm(false);
        setEditable(false);
        setInputValue(label);
    }

    const zIndex = isEditLabelFormOpen ? {zIndex: 25} : {zIndex: 0};

    return (
        <>
        {isEditLabelFormOpen && <div className={styles["LabelItem-Overlay"]} onClick={handleOverlay}></div>}
        <li className={styles["LabelItem-Wrapper"]} style={zIndex}>
            {isEditable ? 
                    <>
                        {error && <small className={styles["InputError"]}>{error}</small>}
                        <input value={inputValue} 
                            className={styles["LabelInput"]} 
                            onChange={(e) => handleInput(e)} 
                            onKeyUp={saveOnEnter} 
                        />
                    </> : 
                <div 
                    className={clsx(styles["LabelItem"], styles[`color${colour}`], isSelected && styles["Selected"])} 
                    onClick={selectLabel} 
                    onContextMenu={showEditLabelForm}>
                {label}{isSelected && <span onClick={(e) => unSelectLabel(e)}>{sidebarSvg["CLOSE"]}</span>} 
                </div>}
                {isEditLabelFormOpen && <ColorPicker deleteLabel={deleteLabel} selectColor={selectColor} editInput={editInput} />}
        </li>
        </>
    )          
}



export default LabelItem;