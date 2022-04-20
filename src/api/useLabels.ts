import axios from 'axios';
import useSWR from 'swr';

import { Label } from 'types/labelType';

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
}

export const useLabels = () => {

    const {data, isValidating, mutate} = useSWR([
        `${process.env.NEXT_PUBLIC_API_URL}/reader/labels`], 
        fetcher
    );

    const createLabel = async (label: Label) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reader/labels`, label)
        const newLabel = response.data;
        return mutate({...data, newLabel})
    }

    const updateLabel = async (label: Label) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reader/labels`, label);
        const updatedLabel = response.data;
        return mutate({...data, updatedLabel});
    }

    const deleteLabel = async (id: string) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/reader/label/${id}`);
        return mutate({labels: data.labels.filter((labelItem: Label) => labelItem._id !== id)});
    }

    return {labelsList: data?.labels, isValidating, createLabel, updateLabel, deleteLabel}
}