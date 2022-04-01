import { FC } from "react";
import LabelItem from "./LabelItem/LabelItem";

import styles from './LabelsList.module.css';

interface Props {
    labelsList: string[],
}

export const LabelsList: FC<Props> = (props) => {
    return (
        <ul className={styles["LabelsList"]}>
            {props.labelsList.map((label, i) => <LabelItem key={i} title={label} />)}
        </ul>
           
    )
}