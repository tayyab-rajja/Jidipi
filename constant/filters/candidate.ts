import {FilterItem} from "./interface";

export enum filterCandidateStatus {
    All = 'all',
    Pending = 'pending',
    Draft = 'draft',
    Published = 'published',
}
/**
 * @param {string} id
 * ?candidate=scheduled
 */
export const data :FilterItem[] = [
    {
        title: "All Candidate",
        count: 18234,
        _id: filterCandidateStatus.All,
        class: "all",
    },
    {
        title: "Waiting to Review",
        count: 4523,
        _id: filterCandidateStatus.Pending,
        class: "review",
    },
    {
        title: "Saved as Draft",
        count: 4523,
        _id: filterCandidateStatus.Draft,
        class: "draft",
    },
    {
        title: "Send to JIDIPI",
        count: 1234,
        _id: filterCandidateStatus.Published,
        class: "scheduled",
    },
];


