import { FC, useState } from "react";

import { AlphabetItem } from "./AlphabetItem/AlphabetItem";

import { alphabet } from "constant/alphabet";

import styles from './Alphabet.module.css';

export const Alphabet: FC = () => {

    const [selectedLetter, setSelectedLetter] = useState('');

    const selectLetter = (letter: string) => {
        setSelectedLetter(letter)
    }

    return (
        <div className={styles["Alphabet-Container"]}>
            <div className={styles["Alphabet-List_Container"]}>
                <ul className={styles["Alphabet-List"]}>
                    {alphabet.map((letter, i) => 
                        <AlphabetItem 
                            key={i} 
                            letter={letter}
                            isSelected={letter === selectedLetter}
                            selectLetter={() => selectLetter(letter)}
                        />)}
                </ul>
            </div>
            <h2 className={styles["Alphabet-SelectedLetter"]}>{selectedLetter}</h2>
        </div>
    )
}