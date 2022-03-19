import { FC } from "react";

import Navbar from "src/components/Navbar";
import Sidebar from "src/components/Sidebar";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactElement;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main className={styles["Layout"]}>
      <Navbar />
      <div className={styles["Layout-Container"]}>
        <Sidebar />
        {children}
      </div>
    </main>
  );
};
