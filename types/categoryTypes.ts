export interface CategoryId {
  title: string;
  type: string;
  uniqueId: string;
  isDeleted: boolean;
  countPublishedPostPerPage?: { [key: string]: number };
}
export interface CategoryAPI {
  title: string;
  type: string;
  uniqueId: string;
  categoryId: CategoryId;
  subCategories: CategoryAPI[];
  isDeleted: boolean;
  countPublishedPostPerPage?: { [key: string]: number };
}

export interface Category {
  title: string;
  type: string;
  uniqueId: string;
  subCategories?: Category[];
  postCount: number;
}

export type CategoryTypes =
  | "CATEGORIES"
  | "FUNCTION"
  | "YEAR"
  | "LOCATION"
  | "GROUP"
  | "SINCE"
  | "COUNTRY"
  | "STYLE"
  | "MATERIAL"
  | "COLOUR"
  | "LANGUAGE"
  | "DESIGNER"
  | "PUBLICATION"
  | "PUBLISHER"
  | "Type"
  | "PEOPLE"
  | "Author";

export interface ISubCategory {
  count: number;
  subCategories: ISubCategory[];
  title: string;
  type: CategoryTypes;
  uniqueId: string;
  url: string;
}

export interface ICategory {
  count: number;
  subCategories: ISubCategory[];
  title: string;
  type: CategoryTypes;
  uniqueId: string;
  url: string;
}

export interface ICategoryTab {
  _id: string;
  count: number;
  pageFolderId: string;
  type: CategoryTypes;
  categories: ICategory[];
}

export interface ICategoriesResponse {
  categories: ICategoryTab[];
  companies: [];
  companiesCount: number;
}

export interface ICompany {
  _id: string;
  count: number;
  partnerId: string;
  slug: string;
  title: string;
  logoId: {
    liveURL: string;
    _id: string;
  };
}

export interface ICompanyTab {
  allRouteName: string;
  companiesCount: number;
  companies: ICompany[];
}
