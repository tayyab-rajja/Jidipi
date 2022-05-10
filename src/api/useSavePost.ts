import axios from 'axios';
interface PostData {
    postId: string,
    mine?: boolean,
    pageFolderId?: string,
    label?: string
}

export const useSavePost = () => {
    
    const addPostToFavourites = async (postData: PostData) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reader`, postData);
        return response.data;
    }

    return { addPostToFavourites };
};