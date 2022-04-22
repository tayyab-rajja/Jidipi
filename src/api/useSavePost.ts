import axios from 'axios';
interface PostData {
    postId: string,
    pageFolderId: string | undefined,
    label?: string
}

export const useSavePost = () => {
    
    const addPostToFavourites = async (postData: PostData) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reader`, postData);
        return response.data;
    }

    return { addPostToFavourites };
};