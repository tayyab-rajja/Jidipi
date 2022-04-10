import {
  ActionFilter,
  AllFilter,
  CategoryFilter,
  GroupFilter,
  LanguageFilter,
  LocationFilter,
} from "../Filters";
import { SearchInput } from "src/components/Input/SearchInput";

import styles from "./ActionFilters.module.css";

export const ActionFilters = () => {
  const type: "post" | "company" | "information" = "information";

  return (
    <div className={styles["ActionFilters-Filters"]}>
      <ActionFilter />
      {type === "post" && <LanguageFilter />}
      {type === "company" && <GroupFilter />}
      {type === "information" && <CategoryFilter />}
      <LocationFilter />
      <AllFilter />
    </div>
  );
};

export default ActionFilters;
