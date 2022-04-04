import { FC, ReactElement } from "react";

import Navbar from "src/components/Navbar";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactElement | ReactElement[];
  SidebarComponent: ReactElement;
}

export const Layout: FC<LayoutProps> = ({ children, SidebarComponent }) => {
  return (
    <>
      <Navbar />
      <main className={styles["Layout-Container"]}>
        {SidebarComponent}
        <div className={styles["Layout-Content"]}>{children}</div>
      </main>
    </>
  );
};
