import useSWR from "swr";

interface PageFolders {
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

export const usePageFolders = (): { data?: PageFolders[]; error: any } => {
  const { data: pageFolders, error } = useSWR<{ pageFolders: PageFolders[] }>(
    "https://api-dev.dev.jidipi.com/api/v1/pages"
  );

  const data = pageFolders?.pageFolders;

  return { data, error };
};
