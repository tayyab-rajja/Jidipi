import { FC, ReactElement } from "react";

import Navbar from "src/components/Navbar";
import Sidebar from "src/components/Sidebar";
import LoginSidebar from "../LoginSidebar/LoginSidebar";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactElement | ReactElement[];
  sidebarCategories?: [];
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles["Layout-Container"]}>
        <Sidebar />
        <div className={styles["Layout-Content"]}>{children}</div>
      </main>
    </>
  );
};
