import { ChangeEvent, useState } from "react";

import { SidebarTabs } from "./SidebarTabs/SidebarTabs";
import { SidebarContent } from "./SidebarContent/SidebarContent";

import styles from "./Sidebar.module.css";
import LoginSidebar from "src/components/LoginSidebar/LoginSidebar";

interface Props {
  sidebarCategories: any;
}

export const Sidebar = ({ sidebarCategories }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentTab, setCurrentTab] = useState("CATEGORIES");

  const categories = sidebarCategories?.categories?.find(
    ({ type }: { type: string }) => type === currentTab
  )?.categories;

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
      <SidebarContent categories={categories} title="All" />
      <LoginSidebar />
    </div>
  );
};
