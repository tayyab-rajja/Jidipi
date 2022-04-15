export function storeLocally(itemName: string, itemValue: any) {
    localStorage.setItem(itemName, JSON.stringify(itemValue));
    // sessionStorage.setItem(itemName, JSON.stringify(itemValue));
}

export function getJsonFromLocalStorage(key: string) {

    let k;
    if (typeof window !== 'undefined') {
        k = localStorage.getItem(key);
        console.log('we are running on the client')
    } else {
        // k = sessionStorage.getItem(key);
        // console.log('we are running on the server');
    }
    if (!k) return {};
    return JSON.parse(k);
}

export function removeFromLocalStorage(key: string) {
    return localStorage.removeItem(key);
}