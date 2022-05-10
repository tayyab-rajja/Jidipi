interface ICreatedBy {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
}

interface IUpdatedBy {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

interface IAward {
    _id: string;
    pageFolderId: string;
    awards: { _id: string; title: string }[];
}

export default interface ICompetition {
    _id: string;
    participatedPosts: any[];
    winningPosts: any[];
    isActive: boolean;
    title: string;
    maxAllowed: number;
    postPublishedStartDate: Date;
    postPublishedEndDate: Date;
    competitionStartDate: Date;
    competitionEndDate: Date;
    winningStartDate: Date;
    winningEndDate: Date;
    createdBy: ICreatedBy;
    uniqueId: string;
    createdAt: string;
    updatedAt: string;
    updatedBy: IUpdatedBy;
    awards: IAward[];
    current: true;
}
