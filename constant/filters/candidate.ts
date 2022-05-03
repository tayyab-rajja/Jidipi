export const data = [
    {
        message: "All Candidate",
        count: 18234,
        id: 1,
        class: "all",
    },
    {
        message: "Waiting to Review",
        count: 4523,
        id: 2,
        class: "review",
    },
    {
        message: "Saved as Draft",
        count: 4523,
        id: 3,
        class: "draft",
    },
    {
        message: "Scheduled to publish",
        count: 1234,
        id: 4,
        class: "scheduled",
    },
];

export interface IItem {
    message: string;
    count: number;
    id: number;
    class: string;
}
