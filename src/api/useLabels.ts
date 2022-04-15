import axios from "axios";
import { useAuth } from "src/providers/AuthProvider/AuthProvider";
import { Label } from "types/labelType";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Imdvb2dsZUVtYWlsIjoiZGFuaWwuemF5Y2hlbmtvQGhlYWR3b3Jrcy5jb20udWEiLCJnb29nbGVJZCI6IjEwOTA0ODA4Njc5NTA3MzM2NjEzNCIsImZpcnN0TmFtZSI6IkRhbmlsIFpheWNoZW5rbyIsInVzZXJuYW1lIjoiZGFuaWwuemF5Y2hlbmtvQGhlYWR3b3Jrcy5jb20udWEiLCJhdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp5dDJvakRnS0lhUWFBc1AyckQzMF9BSDlfR1AzekRSaHdUcXhZNz1zOTYtYyIsImVtYWlsIjoiZGFuaWwuemF5Y2hlbmtvQGhlYWR3b3Jrcy5jb20udWEiLCJpc1ZlcmlmaWVkIjp0cnVlLCJfaWQiOiI2MjRkYWFjNWNmOTE1MzAwMDk0OTg5MTYiLCJyb2xlcyI6W3siX2lkIjoiNjA3NzY3ZGRkM2U1ZWZmYzU1YjYxNTIyIiwidGl0bGUiOiJyZWFkZXIifV19LCJpYXQiOjE2NDkzMTc5NDgsImV4cCI6MTY1MTkwOTk0OH0.RHLV9Ovxawv7XRrgYSWOqoq-lR1SJRkZIGl60SjNnL0';

export const useLabels = () => {

    // const {
    //     session: { token },
    // } = useAuth();

    const createLabel = async (labelName: string, labelColor: string, pageType: string) => {
        const labelData = {
            colour: labelColor,
            label: labelName,
            pageType
        }

        return axios
                .post(`${process.env.NEXT_PUBLIC_API_URL}/reader/labels`, labelData, {headers: {Authorization: "Bearer " + token}})
                .then((res) => res.data);
    }

    const updateLabel = async (label: Label) => {
        const labelData = {
            _id: label._id,
            label: label.label,
            colour: label.colour,
            pageType: label.pageType,
        }
        return axios
                .post(`${process.env.NEXT_PUBLIC_API_URL}/reader/labels`, labelData, {headers: {Authorization: "Bearer " + token}})
                .then((res) => res.data);
    }

    const deleteLabel = async (id: string) => {
        return axios
                .delete(`${process.env.NEXT_PUBLIC_API_URL}/reader/label/${id}`, {headers: {Authorization: "Bearer " + token}})
                .then((res) => res.data);
    }

    return {createLabel, deleteLabel, updateLabel}
}