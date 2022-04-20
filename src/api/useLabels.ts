import axios from 'axios';
import useSWR from 'swr';

import { useAuth } from 'src/providers/AuthProvider/AuthProvider';
import { Label } from 'types/labelType';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Imdvb2dsZUVtYWlsIjoiZGFuaWwuemF5Y2hlbmtvQGhlYWR3b3Jrcy5jb20udWEiLCJnb29nbGVJZCI6IjEwOTA0ODA4Njc5NTA3MzM2NjEzNCIsImZpcnN0TmFtZSI6IkRhbmlsIFpheWNoZW5rbyIsInVzZXJuYW1lIjoiZGFuaWwuemF5Y2hlbmtvQGhlYWR3b3Jrcy5jb20udWEiLCJhdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp5dDJvakRnS0lhUWFBc1AyckQzMF9BSDlfR1AzekRSaHdUcXhZNz1zOTYtYyIsImVtYWlsIjoiZGFuaWwuemF5Y2hlbmtvQGhlYWR3b3Jrcy5jb20udWEiLCJpc1ZlcmlmaWVkIjp0cnVlLCJfaWQiOiI2MjRkYWFjNWNmOTE1MzAwMDk0OTg5MTYiLCJyb2xlcyI6W3siX2lkIjoiNjA3NzY3ZGRkM2U1ZWZmYzU1YjYxNTIyIiwidGl0bGUiOiJyZWFkZXIifV19LCJpYXQiOjE2NDkzMTc5NDgsImV4cCI6MTY1MTkwOTk0OH0.RHLV9Ovxawv7XRrgYSWOqoq-lR1SJRkZIGl60SjNnL0';

const fetcher = (url: string, token: string) => {
    return axios
            .get(url, {headers: { Authorization: "Bearer " + token} })
            .then((res) => res.data);
}

export const useLabels = () => {
    // const {
    //     session: { token },
    // } = useAuth();

    const {data, isValidating, mutate} = useSWR([
        `${process.env.NEXT_PUBLIC_API_URL}/reader/labels`, token], 
        fetcher
    );

    const createLabel = async (labelName: string, labelColor: string, pageType: string) => {
        const labelData = {
            colour: labelColor,
            label: labelName,
            pageType
        }

        const response = await axios
                .post(`${process.env.NEXT_PUBLIC_API_URL}/reader/labels`, labelData, {headers: {Authorization: "Bearer " + token}})
                .then((res) => res.data);
        return mutate({...data, response})
    }

    const updateLabel = async (label: Label) => {
        const labelData = {
            _id: label._id,
            label: label.label,
            colour: label.colour,
            pageType: label.pageType,
        }
        return axios
                .post(`${process.env.NEXT_PUBLIC_API_URL}/reader/labels`, labelData)
                .then((res) => res.data);
    }

    const deleteLabel = async (id: string) => {
        await axios
                .delete(`${process.env.NEXT_PUBLIC_API_URL}/reader/label/${id}`, {headers: {Authorization: "Bearer " + token}})
                .then((res) => res.data);
        return mutate({...data.labels.filter((labelItem: Label) => labelItem._id !== id)});
    }

    return {labelsList: data, isValidating, createLabel, updateLabel, deleteLabel}
}