import clsx from "clsx";
import { FC } from "react";

import styles from './AlphabetItem.module.css';

interface Props {
    letter: string,
    isSelected: boolean,
    selectLetter: () => void
}

export const AlphabetItem: FC<Props> = ({letter, isSelected, selectLetter}) => {
    
    return (
        <li 
            className={clsx(styles["Alphabet-Item"], isSelected && styles["Selected"])} 
            onClick={selectLetter}>
                {letter}
        </li>
    )
}

