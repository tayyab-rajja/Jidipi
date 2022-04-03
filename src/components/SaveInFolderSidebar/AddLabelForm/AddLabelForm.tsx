import { FC, useState } from 'react';
import styles from './AddLabelForm.module.css';

interface Props {
    hideAddLableForm: () => void,
    createLabel: (labelName: string) => void,
}

const AddLabelForm: FC<Props> = ({hideAddLableForm, createLabel}) => {

    const [inputValue, setInputValue] = useState('');

    const handleConfirmBtnOnEnter = (e) => {
        if (!inputValue) {
            return
        }
        if (e.keyCode === 13) {
            createLabel(inputValue);
            setInputValue('');
        }
    }

    const handleConfirmBtn = () => {
        if (!inputValue) {
            return
        }
        createLabel(inputValue);
        setInputValue('');
    }
    
    return (
        <div className={styles["AddLabelForm"]}>
            <div className={styles["AddLabelForm-InputWrapper"]}>
                <input className={styles["AddLabelForm-InputWrapper_Input"]} placeholder="Create a new label" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyUp={handleConfirmBtnOnEnter} />
            </div>
            <div className={styles["AddLabelForm-ButtonWrapper"]}>
                <button className={styles["AddLabelForm-InputWrapper_Button"]} onClick={hideAddLableForm}>Cancel</button>
                <button className={styles["AddLabelForm-InputWrapper_Button"]} onClick={handleConfirmBtn}>Confirm</button>
            </div>
        </div>
    )
}

export default AddLabelForm;