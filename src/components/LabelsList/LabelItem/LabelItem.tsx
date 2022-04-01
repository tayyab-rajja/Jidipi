import { FC } from "react";

import styles from './LabelItem.module.css';

interface Props {
    title: string,
}

const LabelItem: FC<Props> = ({title}) => {
    return (
        <li>
            <div className={styles["LabelItem"]}>{title}</div>
        </li>
    )
}

export default LabelItem;