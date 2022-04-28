import { FC } from "react";

import { AlphabetItem } from "./AlphabetItem/AlphabetItem";

import { alphabet } from "constant/alphabet";

import styles from './Alphabet.module.css';

export const Alphabet: FC = () => {

    return (
        <div className={styles["Alphabet-Container"]}>
            <ul className={styles["Alphabet-List"]}>
                {alphabet.map((letter, i) => <AlphabetItem key={i} letter={letter} />)}
            </ul>
        </div>
    )
}