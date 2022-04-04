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
