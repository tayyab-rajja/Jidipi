import qs from "qs";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";

import { useAuth } from "src/providers/AuthProvider/AuthProvider";

import { getTableData } from "helpers/getTableData";

import { ReaderPost } from "types/readerPostType";

const fetcher = (url: string, token: string) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

const url = `${process.env.NEXT_PUBLIC_API_URL}/reader`;

export const useFavoratePosts = () => {
  const {
    session: { token },
  } = useAuth();

  const [params, setParams] = useState({
    searchKey: "",
    pageSize: 10,
    pageNumber: 0,
  });

  const qsParams = qs.stringify(params);

  const { data, error } = useSWR<{ readerPost: ReaderPost[] }>(
    [`${url}?${qsParams}`, token],
    fetcher
  );

  return { data, error, params, setParams };
};
