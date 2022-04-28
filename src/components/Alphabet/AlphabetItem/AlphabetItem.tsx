import { FC } from "react";

import styles from './AlphabetItem.module.css';

import { alphabet } from "constant/alphabet";

export const AlphabetItem: FC = () => {

    let start = 0;
    let end = 35;
    
    return (
        <>
            {alphabet.map((letter, i) => <li className={styles["Alphabet-Item"]} key={i}>{letter}</li>)}
        </>
    )
}