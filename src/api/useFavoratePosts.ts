import qs from "qs";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";

import { useAuth } from "src/providers/AuthProvider/AuthProvider";

import { ReaderPost } from "types/readerPostType";

const fetcher = (url: string, token: string) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

const url = `${process.env.NEXT_PUBLIC_API_URL}/reader`;

export const useFavoratePosts = (initianPageFolderId: string) => {
  const {
    session: { token },
  } = useAuth();

  const [params, setParams] = useState({
    searchKey: "",
    pageSize: 0,
    pageFolderId: initianPageFolderId,
    pageNumber: 0,
  });

  const qsParams = qs.stringify(params);

  const { data, error, mutate } = useSWR<{
    readerPost: ReaderPost[];
    total: number;
  }>([`${url}?${qsParams}`, token], fetcher);

  const deleteFavorite = async (postId: string) => {
    await axios.delete(`${url}/${postId}`, {
      headers: { Authorization: "Bearer " + token },
    });
    mutate();
  };

  return { data, error, params, setParams, deleteFavorite };
};
