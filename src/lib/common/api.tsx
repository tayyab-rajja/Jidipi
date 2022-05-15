import {getJsonFromLocalStorage} from "./localStorage";
import useSWR from "swr";
import axios from "axios";
import {IFetchPostsResponse} from "../../api/fetchPosts";
import {Cookies} from "react-cookie";
import {GlobalUser} from "../../providers/UserProvider";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
const cookies = new Cookies();
function generateHeader(requestCookies?: NextApiRequestCookies){
    const headers: any = {'Content-Type': 'application/json'}
    const token = cookies.get('token') || requestCookies?.token;
    if (token) headers['Authorization'] = `Bearer ${token}`
    return headers;
}
//
// async function fetchAPI(query, {variables} = {}) {
export async function POST(path: string, variables: any = {}, cookies?: NextApiRequestCookies): Promise<any> {
    try {
        const headers = generateHeader(cookies);
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
export async function PUT(path: string, variables: any = {}, cookies?: NextApiRequestCookies): Promise<any> {
    try {
        const headers = generateHeader(cookies);
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
export async function GET(path: string, cookies?: NextApiRequestCookies): Promise<any> {
    try {
        const headers = generateHeader(cookies);
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
export async function DELETE(path: string, cookies?: NextApiRequestCookies): Promise<any> {
    try {
        const headers = generateHeader(cookies);
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
