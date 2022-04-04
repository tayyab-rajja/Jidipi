import { PageFolders } from "types/pageFoldersTypes";

export const fetchPageFolders = async (): Promise<PageFolders[]> => {
  const response = await fetch("https://api-dev.dev.jidipi.com/api/v1/pages");
  const data = await response.json();

  return data.pageFolders;
};
