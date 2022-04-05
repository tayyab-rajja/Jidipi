import useSWR from "swr";
import { CategoryAPI } from "types/categoryTypes";

export const useCategories = (folderId: string | null) => {
  const { data: categories, error } = useSWR<{ categories: CategoryAPI[] }>(
    folderId
      ? `${process.env.NEXT_PUBLIC_API_URL}/category?pageFolderId=${folderId}`
      : null
  );

  const data = categories?.categories;

  return { data, error };
};
