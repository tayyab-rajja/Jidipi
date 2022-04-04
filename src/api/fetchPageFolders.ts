export interface PageFolders {
  _id: string;
  title: string;
  description: string;
  isDeleted: boolean;
  languages: any;
  pageType: "PROJECT" | "PRODUCT" | "INFORMATION" | "COMPANY";
  subDomain: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchPageFolders = async (): Promise<PageFolders[]> => {
  const response = await fetch("https://api-dev.dev.jidipi.com/api/v1/pages");
  const data = await response.json();

  return data.pageFolders;
};
