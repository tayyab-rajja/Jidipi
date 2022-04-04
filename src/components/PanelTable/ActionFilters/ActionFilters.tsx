import {
  ActionFilter,
  AllFilter,
  LanguageFilter,
  LocationFilter,
} from "../Filters";
import { Input } from "src/components/Input/Input";

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
      <Input />
    </div>
  );
};

export default ActionFilters;
