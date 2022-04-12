import useSWR from "swr";
import { CategoryAPI, ICategoriesResponse } from "types/categoryTypes";

export const useCategories = (folderId: string | null) => {
  const { data: categories, error } = useSWR<ICategoriesResponse>(
    folderId
      ? `${process.env.NEXT_PUBLIC_API_URL}/category/public?pageFolderId=${folderId}`
      : null
  );

  return { categories, error };
};
