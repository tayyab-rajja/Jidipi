export interface queryParameters {
    awardId?: string;
    rating?: string;
    comment?: string;
    score?: string;
    categories?: string;
    candidate?: string;   
    pageNumber?: number;
    pageSize?: number;
    field?: string;
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
