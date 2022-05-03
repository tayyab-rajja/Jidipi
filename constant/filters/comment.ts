import {FilterItem} from "./interface";

export enum filterCommentStatus {
    'noComment' ='noComment',
    'commented' ='commented',
}
/**
 * @param {string} id
 * ?comment=noComment
 */
export const data :FilterItem[] = [
    {
        message: "No Comment",
        count: 22,
        id:  filterCommentStatus.noComment,
    },
    {
        message: "Commented",
        count: 2341,
        id: filterCommentStatus.commented,
    },
];
