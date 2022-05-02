import { ICategoriesResponse, ICategory, ICompany } from "types/categoryTypes";

type GetCategory = (
  categories: ICategoriesResponse | undefined,
  categoryType: string
) => ICategory[] | ICompany[] | [];

export const getCategory: GetCategory = (categories, categoryType) => {
  if (!categories) {
    return [];
  }

  switch (categoryType) {
    case "brand":
    case "architect":
      return categories.companies || [];
    case "category":
      return (
        categories.categories.find(({ type }) => type === "CATEGORIES")
          ?.categories || []
      );
    default:
      return (
        categories.categories.find(
          ({ type }) => type === categoryType.toLocaleUpperCase()
        )?.categories || []
      );
  }
};
