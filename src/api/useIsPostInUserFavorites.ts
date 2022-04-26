import axios from "axios";
import useSWR from "swr";

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

export const useIsPostInUserFavorites = (postId: string) => {

    const { data, error, isValidating } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/reader/inFavorite/${postId}`], fetcher);

    return {
        isFavorite: data.inFavorite,
        error, 
        isValidating
    }
}