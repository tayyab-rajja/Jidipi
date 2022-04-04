import axios from "axios";

export interface IFetchCategoriesListResponse {
  categories: any[];
}
const defaultResponse = { categories: [] };

export const fetchCategoriesList = async (
  folderId: string | undefined
): Promise<any> => {
  if (!folderId) {
    console.error("folderId is missing");
    return defaultResponse;
  }
  try {
    const responsePosts = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/category?pageFolderId=${folderId}`
    );

    return responsePosts.data;
  } catch (error) {
    console.error(error);
    return defaultResponse;
  }
};
