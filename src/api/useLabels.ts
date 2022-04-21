import axios from "axios";
import useSWR from "swr";

import { LabelBody } from "types/labelType";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const useLabels = () => {
  const { data, isValidating, mutate } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/reader/labels`],
    fetcher
  );

  const createLabel = async (body: LabelBody) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/reader/labels`,
      body
    );
    const newLabel = response.data;
    return mutate({ ...data, newLabel });
  };

  const updateLabel = async (body: LabelBody) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/reader/labels`,
      body
    );
    const updatedLabel = response.data;
    return mutate({ ...data, updatedLabel });
  };

  const deleteLabel = async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/reader/label/${id}`);
    return mutate({
      labels: data.labels.filter(
        (labelItem: LabelBody) => labelItem._id !== id
      ),
    });
  };

  return {
    labelsList: data?.labels,
    isValidating,
    createLabel,
    updateLabel,
    deleteLabel,
  };
};
