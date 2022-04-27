import axios from "axios";
import { useAuth } from "src/providers/AuthProvider/AuthProvider";
import useSWR from "swr";

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

export const useIsPostInUserFavorites = (postId: string) => {

    const {
        session: {token}
      } = useAuth();

    const { data, error, isValidating, mutate } = useSWR(token ? [`${process.env.NEXT_PUBLIC_API_URL}/reader/inFavorite/${postId}`] : null, fetcher);

    return {
        isFavorite: data?.inFavorite,
        error, 
        isValidating,
        mutate
    }
}