import { FC, KeyboardEventHandler, useState } from 'react';
import styles from './AddLabelForm.module.css';

interface Props {
    addNewLabel: (labelName: string) => void,
}

const AddLabelForm: FC<Props> = ({addNewLabel}) => {

    const [inputValue, setInputValue] = useState('');

    const handleConfirmBtnOnEnter: KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (!inputValue) {
            return
        }
        if (e.key === 'Enter') {
            addNewLabel(inputValue);
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
        </div>
    )
}

export default AddLabelForm;