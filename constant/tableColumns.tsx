import Image from "next/image";

import { TableColumns } from "types/tableColumnTypes";

export const tableColumns: TableColumns = {
  post: [
    {
      Header: "Select",
      sticky: "left",
      width: 80,
      accessor: "isSelect",
      defaultCanSort: false,
      disableSortBy: true,
    },
    {
      Header: "Image",
      sticky: "left",
      width: 70,
      Cell: (tableProps: any) => {
        if (!tableProps.row.original.image) {
          return "No image";
        }
        return (
          <Image
            src={tableProps.row.original.image}
            width={70}
            height={70}
            alt="Table Image"
          />
        );
      },
      accessor: "image",
      defaultCanSort: false,
      disableSortBy: true,
    },
    {
      Header: "Name",
      sticky: "left",
      width: 280,
      accessor: "name",
    },
    {
      Header: "Location",
      accessor: "location",
      width: 180,
    },
    {
      Header: "Company",
      accessor: "company",
      width: 180,
    },
    {
      Header: "Note",
      accessor: "note",
      width: 280,
    },
    {
      Header: "Label",
      accessor: "label",
      width: 160,
    },
    {
      Header: "Edit",
      accessor: "edit",
      width: 160,
      defaultCanSort: false,
      disableSortBy: true,
    },
  ],
  company: [
    {
      Header: "Select",
      sticky: "left",
      width: 80,
      accessor: "isSelect",
      defaultCanSort: false,
      disableSortBy: true,
    },
    {
      Header: "Image",
      sticky: "left",
      width: 70,
      Cell: (tableProps: any) => {
        if (!tableProps.row.original.image) {
          return "No image";
        }
        return (
          <Image
            src={tableProps.row.original.image}
            width={70}
            height={70}
            alt="Table Image"
          />
        );
      },
      accessor: "image",
      defaultCanSort: false,
      disableSortBy: true,
    },
    {
      Header: "Country",
      sticky: "left",
      width: 100,
      accessor: "country",
    },
    {
      Header: "Brand",
      accessor: "brand",
      width: 180,
    },
    {
      Header: "Company",
      accessor: "company",
      width: 180,
    },
    {
      Header: "Group",
      accessor: "group",
      width: 180,
    },
    {
      Header: "Note",
      accessor: "note",
      width: 280,
    },
    {
      Header: "Label",
      accessor: "label",
      width: 160,
    },
    {
      Header: "Edit",
      accessor: "edit",
      width: 160,
      defaultCanSort: false,
      disableSortBy: true,
    },
  ],
  information: [
    {
      Header: "Select",
      sticky: "left",
      width: 80,
      accessor: "isSelect",
      defaultCanSort: false,
      disableSortBy: true,
    },
    {
      Header: "Image",
      sticky: "left",
      width: 70,
      Cell: (tableProps: any) => {
        if (!tableProps.row.original.image) {
          return "No image";
        }
        return (
          <Image
            src={tableProps.row.original.image}
            width={70}
            height={70}
            alt="Table Image"
          />
        );
      },
      accessor: "image",
      defaultCanSort: false,
      disableSortBy: true,
    },
    {
      Header: "Name",
      sticky: "left",
      width: 280,
      accessor: "name",
    },
    {
      Header: "Category",
      accessor: "category",
      width: 180,
    },
    {
      Header: "Company",
      accessor: "company",
      width: 180,
    },
    {
      Header: "Note",
      accessor: "note",
      width: 280,
    },
    {
      Header: "Label",
      accessor: "label",
      width: 160,
    },
    {
      Header: "Edit",
      accessor: "edit",
      width: 160,
      defaultCanSort: false,
      disableSortBy: true,
    },
  ],
};
