// returns an object with the cookies' name as keys
export const getAppCookies = (req:any) => {
    if(!req || !req.headers || !req.headers.cookie) return {};
    // We extract the raw cookies from the request headers
    const rawCookies:any[] = req.headers.cookie.split('; ');
    // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']

    const parsedCookies:any = {};
    rawCookies.forEach(rawCookie=>{
        const parsedCookie = rawCookie.split('=');
        // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
        console.log(parsedCookie);
        // if(parsedCookie[0]==='user' && parsedCookie[1].includes('_id'))
        //     parsedCookies[parsedCookie[0]] = JSON.parse(parsedCookie[1]);
    });
    return parsedCookies;
};