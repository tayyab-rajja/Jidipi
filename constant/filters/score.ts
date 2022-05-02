import {Property} from "csstype";
import Filter = Property.Filter;
import {FilterItem} from "./interface";

export enum filterScoreStatus {
    '0-0' = '0-0', // >=0 && <=0, no socre
    '0-1' = '0-1', // >=0 && <=1, Average Score 0-1
    '1-2' = '1-2', // > 1 && <=2, Average Score 1-2
    '2-3' = '2-3', // > 2 && <=3
    '3-4' = '3-4', //  > 3 && <=4
    '4-5' = '4-5', // > 4 && <=5
    '5-6' = '5-6',
    '6-7' = '6-7',
    '7-8' = '7-8',
    '8-9' = '8-9',
    '9-10' = '9-10', // > 9 && <=10
}

/**
 *
 * ?minScore=0-0
 */
export const data : FilterItem[] = [
    {message: "No Score", id: filterScoreStatus["0-0"]},
    {message: "Average Score 1-2", id: filterScoreStatus["1-2"]},
    {message: "Average Score 2-3", id: filterScoreStatus["2-3"]},
    {message: "Average Score 3-4", id: filterScoreStatus["3-4"]},
    {message: "Average Score 4-5", id: filterScoreStatus["4-5"]},
    {message: "Average Score 5-6", id: filterScoreStatus["5-6"]},
    {message: "Average Score 6-7", id: filterScoreStatus["6-7"]},
    {message: "Average Score 7-8", id: filterScoreStatus["7-8"]},
    {message: "Average Score 8-9", id: filterScoreStatus["8-9"]},
    {message: "Average Score 9-10", id: filterScoreStatus["9-10"]},
];
