import { ChangeEvent, useState } from "react";

import { SidebarTabs } from "./SidebarTabs/SidebarTabs";
import { SidebarContent } from "./SidebarContent/SidebarContent";

import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentTab, setCurrentTab] = useState("Categories");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleTab = (tab: string) => {
    setCurrentTab(tab);
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
      <SidebarTabs currentTab={currentTab} handleChange={handleTab} />
      <SidebarContent />
    </div>
  );
};
