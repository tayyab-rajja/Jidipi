import axios from "axios";

export interface IFetchPostsResponse {
  posts: any[];
  total: number;
}
const defaultResponse = { posts: [], total: 0 };

export const fetchPosts = async (
  folderId: string | undefined,
  qs: string
): Promise<IFetchPostsResponse> => {
  if (!folderId) {
    console.error("folderId is missing");
    return defaultResponse;
  }
  try {
    const responsePosts = await axios.get<IFetchPostsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/post/public/${folderId}?${qs}`
    );
    return responsePosts.data;
  } catch (error) {
    console.error(error);
    return defaultResponse;
  }
};
