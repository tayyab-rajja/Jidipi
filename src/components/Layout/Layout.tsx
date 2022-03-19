import { FC } from "react";

import Navbar from "src/components/Navbar";
import Sidebar from "src/components/Sidebar";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactElement;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles["Layout-Container"]}>
        <Sidebar />
        {children}
      </main>
    </>
  );
};
