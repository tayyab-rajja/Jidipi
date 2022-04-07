import { TableData } from "types/tableDataTypes";
import { ReaderPost } from "types/readerPostType";

type GetTableData = (
  data: ReaderPost[] | undefined,
  type: string
) => [] | TableData[];

export const getTableData: GetTableData = (data, type) => {
  if (!data) {
    return [];
  }

  switch (type) {
    case "POSTS":
      return data
        .filter(
          ({ pageType, postId }) =>
            (pageType === "PRODUCT" || pageType === "PROJECT") && !!postId
        )
        .map(({ isTrashed, postId, label, note }) => ({
          isTrashed,
          pageFolderId: postId.pageFolderId,
          isSelect: false,
          image: postId.featuredImage.sizes[0],
          name: postId.title,
          location: postId.language,
          compay: "Lorem, ipsum.",
          label: label?.label || "",
          note: note || "",
        }));
    default:
      return [];
  }
};
