/* eslint-disable no-restricted-syntax */
import queryString from "query-string";
import { queryParameters } from "types/queryParameters";

export function getQueryParams(obj: string): queryParameters {
    return queryString.parse(obj, { parseBooleans: true, parseNumbers: true }) as unknown as queryParameters;
}

export const getQueryString = (obj: queryParameters): string => {
    return queryString.stringify(obj);
    // const str = [];
    // for (var p in obj)
    //   if (obj.hasOwnProperty(p)) {
    //     str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    //   }
    // return str.join('&');
};
