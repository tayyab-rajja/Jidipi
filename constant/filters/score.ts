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
export default [
    {title: "No Score", _id: filterScoreStatus["0-0"]},
    {title: "Average Score 1-2", _id: filterScoreStatus["1-2"]},
    {title: "Average Score 2-3", _id: filterScoreStatus["2-3"]},
    {title: "Average Score 3-4", _id: filterScoreStatus["3-4"]},
    {title: "Average Score 4-5", _id: filterScoreStatus["4-5"]},
    {title: "Average Score 5-6", _id: filterScoreStatus["5-6"]},
    {title: "Average Score 6-7", _id: filterScoreStatus["6-7"]},
    {title: "Average Score 7-8", _id: filterScoreStatus["7-8"]},
    {title: "Average Score 8-9", _id: filterScoreStatus["8-9"]},
    {title: "Average Score 9-10", _id: filterScoreStatus["9-10"]},
] as FilterItem[];
