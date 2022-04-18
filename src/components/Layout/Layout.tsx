import { FC, ReactElement } from "react";

import Navbar from "src/components/Navbar";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactElement | ReactElement[];
  sidebarComponent: ReactElement;
}

export const Layout: FC<LayoutProps> = ({ children, sidebarComponent }) => {
  return (
    <>
      <Navbar />
      <main className={styles["Layout-Container"]}>
        {sidebarComponent}
        <div className={styles["Layout-Content"]}>{children}</div>
      </main>
    </>
  );
};
