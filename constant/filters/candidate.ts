import {FilterItem} from "./interface";

export enum filterCandidateStatus {
    All = 'ALL',
    Pending = 'PENDING',
    Draft = 'DRAFT',
    Published = 'PUBLISHED',
}
/**
 * @param {string} id
 * ?candidate=scheduled
 */
export const data :FilterItem[] = [
    {
        message: "All Candidate",
        count: 18234,
        id: filterCandidateStatus.All,
        class: "all",
    },
    {
        message: "Waiting to Review",
        count: 4523,
        id: filterCandidateStatus.Pending,
        class: "review",
    },
    {
        message: "Saved as draft",
        count: 4523,
        id: filterCandidateStatus.Draft,
        class: "draft",
    },
    {
        message: "Send to JIDIPI",
        count: 1234,
        id: filterCandidateStatus.Published,
        class: "scheduled",
    },
];


