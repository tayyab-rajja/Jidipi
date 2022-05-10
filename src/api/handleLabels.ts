import axios from "axios";
import { LabelBody } from "types/labelType";

export const createLabel = async (body: LabelBody) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reader/labels`,
        body
      );
    const data = await response.data;

    return data;
}

export const updateLabel = async (body: LabelBody) => {
    await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reader/labels`,
        body);
}

export const deleteLabel = async (id: string) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/reader/label/${id}`);
    if (res.status !== 200) {
      return res;
    } 
}