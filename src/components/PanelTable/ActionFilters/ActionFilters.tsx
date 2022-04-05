import {
  ActionFilter,
  AllFilter,
  LanguageFilter,
  LocationFilter,
} from "../Filters";
import { SearchInput } from "src/components/Input/SearchInput";

import styles from "./ActionFilters.module.css";

export const ActionFilters = () => {
  return (
    <div className={styles["ActionFilters"]}>
      <div className={styles["ActionFilters-Filters"]}>
        <ActionFilter />
        <LanguageFilter />
        <LocationFilter />
        <AllFilter />
      </div>
      <SearchInput onChange={() => {}} />
    </div>
  );
};

export default ActionFilters;
