import useSWR from "swr";

import { PageFolder } from "types/pageFolderType";

export const usePageFolderByName = (
  name: string | null
): { data?: PageFolder; error: any; isValidating: boolean } => {
  const {
    data: pageFolder,
    error,
    isValidating,
  } = useSWR<{ pageFolder: PageFolder }>(
    name
      ? `${process.env.NEXT_PUBLIC_API_URL}/pages/filterByDomain/${name}`
      : null
  );

  const data = pageFolder?.pageFolder;

  return { data, error, isValidating };
};
