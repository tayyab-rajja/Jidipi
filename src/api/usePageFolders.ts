import useSWR from "swr";

import { PageFolders } from "types/pageFoldersTypes";

export const usePageFolders = (): { data?: PageFolders[]; error: any } => {
  const { data: pageFolders, error } = useSWR<{ pageFolders: PageFolders[] }>(
    "https://api-dev.dev.jidipi.com/api/v1/pages"
  );

  const data = pageFolders?.pageFolders;

  return { data, error };
};
