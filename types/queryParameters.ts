export interface queryParameters {
    pageNumber?: number;
    pageSize?: number;
    status?: string;
    language?: string;
    searchKey?: string;
    date?: string;
    user?: string;
    field?: string;
    country?: string;
    group?: string;
    count?: number;
    onlyPublished?: boolean;
    isChatFinished?: boolean;
    isPartnerChatFinished?: boolean;
    image?: string;
    location?: string;
    lastLoginIn?: string;
    partnerMoreUser?: boolean;
    isActive?: boolean;
    action?: string;
    order?: string | number;    
    [key: string]: boolean | number | string | undefined;
}

export interface pageFilters {
    pageNumber: number;
    pageSize: number;
}

export interface postFilters
    extends Omit<queryParameters, "pageNumber" | "pageSize"> {}

export interface sort {
    field?: string;
    order?: string | number;
}
