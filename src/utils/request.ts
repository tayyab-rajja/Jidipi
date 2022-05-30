
import history from './history';


const commonHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
};

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: any) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    if (response.status === 401) {
        if (window.location.href.indexOf("partner/log") > -1) {
            return null;
        }
        history.push("/login");
    }
    const resp = await response.json();

    const error = new Error(resp.error);

    throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url: any, token: any, options = {} as any) {
    const completeUrl = process.env.NEXT_PUBLIC_API_URL + url;
    options.headers = options.headers || {};
    Object.assign(options.headers, commonHeaders);
    if (token) {
        Object.assign(options.headers, {
            Authorization: `Bearer ${token}`,
        });
    }
    
    return fetch(completeUrl, options).then(checkStatus).then(parseJSON);
}
