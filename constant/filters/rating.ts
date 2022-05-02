import {FilterItem} from "./interface";

export enum filterRatingStatus {
    'noRating' = 'noRating',
    'rated' = 'rated',
}

/**
 * @param {string} id
 * ?rating=noRating
 */
export const data: FilterItem[] = [
    {
        message: "No Rating",
        count: 33,
        id: filterRatingStatus.noRating,
    },
    {
        message: "Rated",
        count: 2341,
        id: filterRatingStatus.rated,
    },
];