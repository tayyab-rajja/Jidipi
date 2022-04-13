import { ReactElement } from "react";

export interface TableColumn {
  Header: string;
  sticky?: string;
  width?: number;
  Cell?: (tableProps: any) => ReactElement | string;
  accessor: string;
  defaultCanSort?: boolean;
  disableSortBy?: boolean;
}

export interface TableColumns {
  post: TableColumn[];
  company: TableColumn[];
  information: TableColumn[];
}
