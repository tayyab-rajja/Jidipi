export const getTableData = (data: any, type: string) => {
  if (!data) {
    return [];
  }
  switch (type) {
    case "POSTS":
      return data
        .filter(
          ({ pageType }) => pageType === "PRODUCT" || pageType === "PROJECT"
        )
        .map(({ isTrashed, postId, label }) => ({
          isTrashed,
          isSelect: false,
          image: postId.featuredImage.sizes[0],
          name: postId.title,
          location: postId.language,
          compay: "Lorem, ipsum.",
          label: label.label,
          note: "",
        }));
    default:
      return [];
  }
};
