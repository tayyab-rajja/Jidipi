import { FC } from "react";

import styles from './AlphabetItem.module.css';

interface Props {
    letter: string,
}

export const AlphabetItem: FC<Props> = ({letter}) => {
    
    return (
        <li className={styles["Alphabet-Item"]}>{letter}</li>
    )
}

