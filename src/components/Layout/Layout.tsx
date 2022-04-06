import { FC, ReactElement } from "react";

import Navbar from "src/components/Navbar";

import { PageFolder } from "types/pageFolderType";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactElement | ReactElement[];
  SidebarComponent: ReactElement;
  pageFolders: PageFolder[];
}

export const Layout: FC<LayoutProps> = ({
  children,
  SidebarComponent,
  pageFolders,
}) => {
  return (
    <>
      <Navbar pageFolders={pageFolders} />
      <main className={styles["Layout-Container"]}>
        {SidebarComponent}
        <div className={styles["Layout-Content"]}>{children}</div>
      </main>
    </>
  );
};
