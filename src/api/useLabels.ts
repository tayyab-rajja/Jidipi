import axios from "axios";
import useSWR from "swr";

import { useAuth } from "src/providers/AuthProvider/AuthProvider";

import { LabelBody } from "types/labelType";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const useLabels = () => {
  const {
    session: {token}
  } = useAuth();

  const { data, isValidating, mutate } = useSWR(token ? [`${process.env.NEXT_PUBLIC_API_URL}/reader/labels/`] : null, fetcher);

  const createLabel = async (body: LabelBody) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/reader/labels`,
      body
    );
    const newLabel = response.data;
    return mutate({ ...data, newLabel });
  };

  const updateLabel = async (body: LabelBody) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/reader/labels`,
      body);
    return mutate({labels: [body, ...data.labels.filter((label: LabelBody) => label._id !== body._id)]});
  };

  const deleteLabel = async (id: string) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/reader/label/${id}`);
    if (res.response?.status === 500) {
      let error = "This label links with posts!";
      return error;
    } else {
      return mutate({
        labels: data.labels.filter(
          (labelItem: LabelBody) => labelItem._id !== id
         ),
       });
    }
  };

  return {
    labelsList: data?.labels,
    isValidating,
    createLabel,
    updateLabel,
    deleteLabel
  };
};
