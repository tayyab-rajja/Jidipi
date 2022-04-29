import { ICategoriesResponse } from "types/categoryTypes";

export const getCategory = (
    categories: ICategoriesResponse | undefined,
    categoryType: string
  ) => {
    if (!categories) {
      return [];
    }
  
    switch (categoryType) {
      case "brand":
      case "architect":
        return categories.companies;
      case "category":
        return categories.categories.find(({ type }) => type === "CATEGORIES")
          ?.categories;
      default:
        return categories.categories.find(
          ({ type }) => type === categoryType.toLocaleUpperCase()
        )?.categories;
    }
};