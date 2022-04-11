import { FC } from "react";

import {
  ActionFilter,
  AllFilter,
  CategoryFilter,
  GroupFilter,
  LanguageFilter,
  LocationFilter,
} from "../Filters";

import { FilterTypes } from "types/filterTypes";

import styles from "./ActionFilters.module.css";

interface ActionFiltersProps {
  handleAction: (type: string) => void;
  handleFilterChange: (type: FilterTypes, value: string | boolean) => void;
}

export const ActionFilters: FC<ActionFiltersProps> = ({
  handleFilterChange,
  handleAction,
}) => {
  const type: "post" | "company" | "information" = "post";

  return (
    <div className={styles["ActionFilters"]}>
      <ActionFilter handleAction={handleAction} />
      {type === "post" && (
        <LanguageFilter handleFilterChange={handleFilterChange} />
      )}
      {/* {type === "company" && (
        <GroupFilter handleFilterChange={handleFilterChange} />
      )}
      {type === "information" && (
        <CategoryFilter handleFilterChange={handleFilterChange} />
      )} */}
      <LocationFilter handleFilterChange={handleFilterChange} />
      <AllFilter handleFilterChange={handleFilterChange} />
    </div>
  );
};

export default ActionFilters;
