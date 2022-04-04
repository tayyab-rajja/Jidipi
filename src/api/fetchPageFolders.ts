import { PageFolder } from "types/pageFolderType";

export const fetchPageFolders = async (): Promise<PageFolder[]> => {
  const response = await fetch("https://api-dev.dev.jidipi.com/api/v1/pages");
  const data = await response.json();

  return data.pageFolders;
};
