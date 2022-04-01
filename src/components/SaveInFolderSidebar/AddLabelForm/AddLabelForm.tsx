import { FC } from 'react';
import styles from './AddLabelForm.module.css';

interface Props {
    hideAddLableForm: () => void,
}

const AddLabelForm: FC<Props> = ({hideAddLableForm}) => {
    return (
        <div className={styles["AddLabelForm"]}>
            <div className={styles["AddLabelForm-InputWrapper"]}>
                <input className={styles["AddLabelForm-InputWrapper_Input"]} placeholder="Create a new label" />
            </div>
            <div className={styles["AddLabelForm-ButtonWrapper"]}>
                <button className={styles["AddLabelForm-InputWrapper_Button"]} onClick={hideAddLableForm}>Cancel</button>
                <button className={styles["AddLabelForm-InputWrapper_Button"]}>Confirm</button>
            </div>
        </div>
    )
}

export default AddLabelForm;