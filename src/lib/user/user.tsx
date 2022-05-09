import {useState, useEffect} from 'react'
import {NextApiRequest, NextApiResponse} from "next";



export  async function login(req: NextApiRequest, res: NextApiResponse)  {
    // const { headers, body } = req
    //
    // try {
    //     // const { data, headers: returnedHeaders } = await fetch(
    //     //     API_URL+'/user/login', // Node.js backend path
    //     //     body, // Login body (email + password)
    //     //     { headers } // Headers from the Next.js Client
    //     // )
    //     // //  Update headers on requester using headers from Node.js server response
    //     // Object.entries(returnedHeaders).forEach((keyArr) =>
    //     //     res.setHeader(keyArr[0], keyArr[1] as string)
    //     // )
    //     // res.send(data) // Send data from Node.js server response
    // } catch ({ response: { status, data } }) {
    //     // Send status (probably 401) so the axios interceptor can run.
    //     res.status(status).json(data)
    // }
}
export async function fetchUser(cookie = '') {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.__user) return window.__user

    const res = await fetch(
        '/api/me',
        cookie ? {headers: {cookie,},} : {}
    )

    if (!res.ok) {
        // @ts-ignore
        delete window.__user
        return null
    }

    const json = await res.json()
    // @ts-ignore
    if (typeof window !== 'undefined') window.__user = json
    return json
}

// export function useFetchUser({required} = {}) {
export function useFetchUser({required = false}) {
    // @ts-ignore
    const [loading, setLoading] = useState(() => !(typeof window !== 'undefined' && window.__user))
    const [user, setUser] = useState(() => {
        if (typeof window === 'undefined') {
            return null
        }
        // @ts-ignore
        return window.__user || null
    })

    useEffect(
        () => {
            if (!loading && user) {
                return
            }
            setLoading(true)
            let isMounted = true

            fetchUser().then((user) => {
                // Only set the user if the component is still mounted
                if (isMounted) {
                    // When the user is not logged in but login is required
                    if (required && !user) {
                        window.location.href = '/api/login'
                        return
                    }
                    setUser(user)
                    setLoading(false)
                }
            })

            return () => {
                isMounted = false
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return {user, loading}
}