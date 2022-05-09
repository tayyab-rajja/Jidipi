import {FilterItem} from "./interface";

export enum filterRatingStatus {
    'noRating' = 'noRating',
    'rated' = 'rated',
}

/**
 * @param {string} _id
 * ?rating=noRating
 */
export default [
    {
        title: "No Rating",
        count: 33,
        _id: filterRatingStatus.noRating,
    },
    {
        title: "Rated",
        count: 2341,
        _id: filterRatingStatus.rated,
    },
] as  FilterItem[];