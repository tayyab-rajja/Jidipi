import Image from "next/image";

export const tableColumns = [
  {
    Header: "Select",
    sticky: "left",
    width: 80,
    accessor: "isSelect",
  },
  {
    Header: "Image",
    sticky: "left",
    width: 70,
    Cell: (tableProps: any) => (
      <Image
        src={tableProps.row.original.image}
        width={70}
        height={70}
        alt="Table Image"
      />
    ),
    accessor: "image",
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
  },
];
