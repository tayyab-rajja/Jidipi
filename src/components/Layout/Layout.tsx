import { FC, ReactElement } from "react";

import Navbar from "src/components/Navbar";
import Sidebar from "src/components/Sidebar";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactElement | ReactElement[];
  sidebarCategories: any;
}

export const Layout: FC<LayoutProps> = ({ children, sidebarCategories }) => {
  return (
    <>
      <Navbar />
      <main className={styles["Layout-Container"]}>
        <Sidebar sidebarCategories={sidebarCategories} />
        <div className={styles["Layout-Content"]}>{children}</div>
      </main>
    </>
  );
};
