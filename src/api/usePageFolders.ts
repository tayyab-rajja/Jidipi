import useSWR from "swr";

import { PageFolder } from "types/pageFolderType";

export const usePageFolders = (): { data?: PageFolder[]; error: any } => {
  const { data: pageFolders, error } = useSWR<{ pageFolders: PageFolder[] }>(
    "https://api-dev.dev.jidipi.com/api/v1/pages"
  );

  const data = pageFolders?.pageFolders;

  return { data, error };
};
