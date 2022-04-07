export interface ReaderPost {
  isActive: boolean;
  isTrashed: boolean;
  _id: string;
  label: {
    _id: string;
    label: string;
    pageType: "PROJECT" | "PRODUCT" | "INFORMATION" | "COMPANY";
    colour: string;
    createdBy: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  pageType: "PROJECT" | "PRODUCT" | "INFORMATION" | "COMPANY";
  note?: string;
  postId: {
    _id: string;
    title: string;
    slug: string;
    language: string;
    company: string;
    location: string;
    pageFolderId: string;
    postUniqueId: string;
    profix: string;
    pageType: "PROJECT" | "PRODUCT" | "INFORMATION" | "COMPANY";
    featuredImage: {
      sizes: string[];
      _id: string;
      liveURL: string;
    };
  };
  createdBy: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
