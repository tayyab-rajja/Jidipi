import { alphabet } from "constant/alphabet";

export const getLettersArray = (containerWidth: number, containerHeight: number) => {

    const letterWidth = 30;
    const letterHeight = 30;

    let multiplierX = ((containerWidth - 70) / letterWidth);
    let multiplierY = ((containerHeight - 44) / letterHeight); 
    let totalLetters = Math.round((multiplierX * multiplierY));

    let wholeAlphabetArray = [];
    let finalArray = [];
    const numberOfAlphabets = Math.round(totalLetters / alphabet.length);
    console.log(numberOfAlphabets)

    for (let i = 0; i < numberOfAlphabets; i++) {
        wholeAlphabetArray.push(...alphabet);
    }

    let remainedLetters = totalLetters - wholeAlphabetArray.length;
    if (remainedLetters <= 0) {
        wholeAlphabetArray.length = wholeAlphabetArray.length - Math.abs(remainedLetters);
        finalArray = [...wholeAlphabetArray];
        console.log(finalArray)
        return finalArray;
    }
    let remainedLettersArray = alphabet.slice(0, remainedLetters);
    finalArray = [...wholeAlphabetArray, ...remainedLettersArray];
    console.log(finalArray)

    return finalArray;
}