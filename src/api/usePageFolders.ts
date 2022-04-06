import useSWR from "swr";

import { PageFolder } from "types/pageFolderType";

export const usePageFolders = (): { data?: PageFolder[]; error: any } => {
  const { data: pageFolders, error } = useSWR<{ pageFolders: PageFolder[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/pages`
  );

  const data = pageFolders?.pageFolders;

  return { data, error };
};
