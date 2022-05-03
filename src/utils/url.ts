import {
    queryParameters,
    postFilters,
    pageFilters,
    sort,
} from "types/queryParameters";
import { getQueryParams, getQueryString } from "./queryString";

export const getFiltersFromUrl = (
    url: string
): { pageFilters: pageFilters; postFilters: postFilters; sort: sort } => {
    let {
        pageNumber,
        pageSize,
        status,
        language,
        searchKey,
        date,
        user,
        field,
        country,
        group,
        count,
        onlyPublished,
        isChatFinished,
        isPartnerChatFinished,
        image,
        location,
        lastLoginIn,
        partnerMoreUser,
        isActive,
    } = getQueryParams(url);

    if (pageNumber === undefined) {
        pageNumber = -1;
    } else {
        if (pageNumber > 0) {
            pageNumber--;
        }
    }

    if (pageSize === undefined) {
        pageSize = 20;
    }
    const pageFilters = { pageNumber: pageNumber, pageSize: pageSize };

    // const postFilters={status:status,language:language,searchKey:searchKey,date:date,user:user};
    const postFilters: queryParameters = {};
    if (user !== undefined && user !== null && user !== "") {
        postFilters.user = user;
    }
    if (
        status === "Mine" &&
        user !== undefined &&
        user !== null &&
        user !== ""
    ) {
        // postFilters.user = user;
    }
    if (language !== undefined && language !== "") {
        postFilters.language = language;
    }
    if (status !== undefined && status !== "" && status !== "All") {
        postFilters.status = status;
    }
    if (date !== undefined && date !== "") {
        postFilters.date = date;
    }
    if (searchKey !== undefined && searchKey !== "") {
        postFilters.searchKey = searchKey;
    }
    if (country !== undefined && country !== "") {
        postFilters.country = country;
    }
    if (location !== undefined && location !== "") {
        postFilters.location = location;
    }
    if (group !== undefined && group !== "") {
        postFilters.group = group;
    }
    if (count !== undefined) {
        postFilters.count = count;
    }
    if (onlyPublished !== undefined) {
        postFilters.onlyPublished = onlyPublished;
    }

    if (isChatFinished !== undefined) {
        postFilters.isChatFinished = isChatFinished;
    }

    if (isPartnerChatFinished !== undefined) {
        postFilters.isPartnerChatFinished = isPartnerChatFinished;
    }
    if (image !== undefined && image !== "") {
        postFilters.image = image;
    }
    if (lastLoginIn !== undefined && lastLoginIn !== "") {
        postFilters.lastLoginIn = lastLoginIn;
    }
    if (partnerMoreUser !== undefined && lastLoginIn !== "") {
        postFilters.partnerMoreUser = partnerMoreUser;
    }
    if (isActive !== undefined && lastLoginIn !== "") {
        postFilters.isActive = isActive;
    }

    const sort =
        field && field !== "undefined" ? { order: 1, field: field } : {};
    return {
        postFilters: postFilters,
        pageFilters: pageFilters,
        sort: sort,
    };
};
export const setUrlForListPage = (
    pageFilters: pageFilters,
    postFilters: postFilters,
    sort: sort
) => {
    let query: queryParameters = {};
    if (pageFilters.pageNumber >= 0) {
        query["pageNumber"] = pageFilters.pageNumber + 1;
    }
    if (pageFilters.pageSize !== 20) {
        query["pageSize"] = pageFilters.pageSize;
        query["action"] = "check";
    }
    Object.keys(postFilters).forEach((key) => {
        if (
            postFilters[key] !== undefined &&
            postFilters[key] !== null &&
            postFilters[key] !== ""
        ) {
            if (key === "status" && postFilters[key] === "All") {
            } else {
                query[key] = postFilters[key];
            }
        }
    });

    if (sort.field && sort.field !== "createdAt") {
        query["field"] = sort.field;
        if (sort.order !== "1" && sort.order !== 1) query["order"] = sort.order;
    }

    let path = "?" + getQueryString(query);
    if (path === "?") {
        path = "";
    }
    let href = window.location.pathname + path;
    window.history.pushState({}, "", href);
};

export function Linkify(inputText: string) {
    if (!inputText) return "";
    //URLs starting with http://, https://, or ftp://
    var replacePattern1 =
        /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    var replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
    );

    //URLs starting with www. (without // before it, or it'd re-link the ones done above)
    var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    var replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank">$2</a>'
    );

    //Change email addresses to mailto:: links
    var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    var replacedText = replacedText.replace(
        replacePattern3,
        '<a href="mailto:$1">$1</a>'
    );

    return replacedText;
}
