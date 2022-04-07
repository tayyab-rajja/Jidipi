import Image from "next/image";

export const tableColumns = [
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
    accessor: "compay",
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
];
