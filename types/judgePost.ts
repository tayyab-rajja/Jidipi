interface companyId {
    _id: string;
    brandName: string;
    companyName: string;
    country: string;
    uniqueId: string;
    partnerId: string;
    avatar: string;
}

interface featuredImage {
    _id: string;
    sizes: string[];
    name: string;
    liveURL: string;
}

export interface IJudgePost {
    _id: string;
    title: string;
    slug: string;
    language: string;
    companyId: companyId;
    publishedDate: string;
    pageFolderId: string;
    postUniqueId: string;
    featuredImage: featuredImage;
    awardId: string;
    competitionId: string;
    applicationDate: string;
    rating: number;
    commetted: boolean;
    score: number;
    candidateStatus: 'PUBLISHED' | 'DRAFT' | 'PENDING'
}
