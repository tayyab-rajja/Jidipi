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
