import { ChangeEvent, useState } from "react";
import { useTranslation } from "next-i18next";

import styles from "./Sidebar.module.css";
import { SidebarTabs } from "./SidebarTabs";

export const Sidebar = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <div className={styles["Sidebar"]}>
      <input
        className={styles["Sidebar-SearchInput"]}
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search"
      />
      <SidebarTabs />
    </div>
  );
};
