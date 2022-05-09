import {getJsonFromLocalStorage} from "./localStorage";
import useSWR from "swr";
import axios from "axios";
import {IFetchPostsResponse} from "../../api/fetchPosts";
import {Cookies} from "react-cookie";
import {GlobalUser} from "../../providers/UserProvider";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
const cookies = new Cookies();
function generateHeader(){
    const headers: any = {'Content-Type': 'application/json'}
    if (GlobalUser.token) {
        headers['Authorization'] = `Bearer ${GlobalUser.token}`
    } else {
        //TODO should use the middleware to check if the user is logged in
        const token = cookies.get('token');
        if (token) headers['Authorization'] = `Bearer ${token}`
    }
    return headers;
}
//
// async function fetchAPI(query, {variables} = {}) {
export async function POST(path: string, variables: any = {}): Promise<any> {
    try {
        const headers = generateHeader();
        const res: Response = await fetch(API_URL + path, {
            method: 'POST',
            headers,
            body: JSON.stringify({...variables}),
        })

        console.log(res);
        if (!res.ok)      throw  new Error(res.statusText);
        return await res.json();
    } catch (e: any) {
        throw  e;
    }
}
export async function PUT(path: string, variables: any = {}): Promise<any> {
    try {
        const headers = generateHeader();
        const res: Response = await fetch(API_URL + path, {
            method: 'PUT',
            headers,
            body: JSON.stringify({...variables}),
        })
        if (!res.ok)      throw  new Error(res.statusText);
        return await res.json();
    } catch (e: any) {
        throw  e;
    }
}

// export function* GET(path: string, variables: any = {}) {
export async function GET(path: string): Promise<any> {
    try {
        const headers = generateHeader();
        const res: Response = await fetch(API_URL + path, {
            method: 'GET',
            headers,
        })
        if (!res.ok)      throw  new Error(res.statusText);
         return await res.json();
    } catch (e: any) {
        throw  e;
    }
}
export async function DELETE(path: string): Promise<any> {
    try {
        const headers = generateHeader();
        const res: Response = await fetch(API_URL + path, {
            method: 'DELETE',
            headers,
        })
        if (!res.ok)      throw  new Error(res.statusText);
         return await res.json();
    } catch (e: any) {
        throw  e;
    }
}
