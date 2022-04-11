import { tableColumns } from "constant/tableColumns";

import { TableData } from "types/tableDataTypes";
import { ReaderPost } from "types/readerPostType";
import { TableColumn } from "types/tableColumnTypes";

type GetTableData = (
  data: ReaderPost[] | undefined,
  type: "POSTS" | "INFORMATION" | "COMPANY"
) => {
  tableData: [] | TableData[];
  tableColumns: TableColumn[];
  tableFilters: string[];
};

export const getTableData: GetTableData = (data, type) => {
  const tableOptions = {
    tableData: [] as [] | TableData[],
    tableColumns: [] as TableColumn[],
    tableFilters: [] as string[],
  };

  switch (type) {
    case "POSTS":
      if (data) {
        tableOptions.tableData = data
          .filter(
            ({ pageType, postId }) =>
              (pageType === "PRODUCT" || pageType === "PROJECT") && !!postId
          )
          .map(({ isTrashed, postId, label, note }) => ({
            isTrashed,
            pageFolderId: postId.pageFolderId,
            isSelect: false,
            language: postId.language,
            image: postId.featuredImage.sizes[0],
            name: postId.title,
            location: postId?.location || "",
            company: postId?.company || "",
            label: label?.label || "",
            note: note || "",
          }));
      }
      tableOptions.tableColumns = tableColumns.post;
      break;

    case "INFORMATION":
      if (data) {
        tableOptions.tableData = data
          .filter(
            ({ pageType, postId }) => pageType === "INFORMATION" && !!postId
          )
          .map(({ isTrashed, postId, label, note }) => ({
            isTrashed,
            pageFolderId: postId.pageFolderId,
            isSelect: false,
            language: postId.language,
            image: postId.featuredImage.sizes[0],
            name: postId.title,
            category: postId?.category || "",
            company: postId?.company || "",
            label: label?.label || "",
            note: note || "",
          }));
      }
      tableOptions.tableColumns = tableColumns.information;
      break;

    case "COMPANY":
      if (data) {
      //   tableOptions.tableData = data
      //     .filter(
      //       ({ pageType, postId }) =>
      //         (pageType === "PRODUCT" || pageType === "PROJECT") && !!postId
      //     )
      //     .map(({ isTrashed, postId, label, note }) => ({
      //       isTrashed,
      //       pageFolderId: postId.pageFolderId,
      //       isSelect: false,
      //       language: postId.language,
      //       image: postId.featuredImage.sizes[0],
      //       name: postId.title,
      //       location: postId?.location || "",
      //       company: postId?.company || "",
      //       label: label?.label || "",
      //       note: note || "",
      //     }));
      // }
      tableOptions.tableColumns = tableColumns.company;
      break;
  }

  return tableOptions;
};
