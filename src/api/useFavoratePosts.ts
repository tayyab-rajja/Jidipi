import axios from "axios";
import { useAuth } from "src/providers/AuthProvider";
import useSWR from "swr";

const fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

export const useFavoratePosts = () => {
  const {
    session: { token },
  } = useAuth();

  const { data, error } = useSWR(
    [`https://api-dev.dev.jidipi.com/api/v1/reader`, token],
    fetcher
  );

  return { data, error };
};
