import { FilterItem } from "./interface";

export enum filterCommentStatus {
    "noComment" = "noComment",
    "commented" = "commented",
}
/**
 * @param {string} id
 * ?comment=noComment
 */
export default [
    {
        title: "No Comment",
        count: 22,
        _id: filterCommentStatus.noComment,
    },
    {
        title: "Commented",
        count: 2341,
        _id: filterCommentStatus.commented,
    },
] as FilterItem[];
