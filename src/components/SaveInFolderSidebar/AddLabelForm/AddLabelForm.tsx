import { FC, KeyboardEventHandler, useState } from 'react';
import styles from './AddLabelForm.module.css';
import { sidebarSvg } from 'constant/sidebarSvg';

interface Props {
    hideAddLableForm: () => void,
    createLabel: (labelName: string) => void,
}

const AddLabelForm: FC<Props> = ({hideAddLableForm, createLabel}) => {

    const [inputValue, setInputValue] = useState('');

    const handleConfirmBtnOnEnter: KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (!inputValue) {
            return
        }
        if (e.key === 'Enter') {
            createLabel(inputValue);
            setInputValue('');
        }
    }
    
    return (
        <div className={styles["AddLabelForm"]}>
            <div className={styles["AddLabelForm-InputWrapper"]}>
                <input 
                    className={styles["AddLabelForm-InputWrapper_Input"]} 
                    placeholder="Create a new label" 
                    maxLength={20} 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyUp={handleConfirmBtnOnEnter} />
            </div>
            <div className={styles["AddLabelForm-ButtonWrapper"]}>
                <button className={styles["AddLabelForm-InputWrapper_Button"]} onClick={hideAddLableForm}>
                    {sidebarSvg["CANCEL"]}Cancel
                </button>
                <button className={styles["AddLabelForm-InputWrapper_Button"]}>
                    {sidebarSvg["CONFIRM"]}Confirm
                </button>
            </div>
        </div>
    )
}

export default AddLabelForm;