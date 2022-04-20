import clsx from "clsx";
import { FC, ReactElement } from "react";

import Navbar from "src/components/Navbar";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactElement | ReactElement[];
  sidebarComponent?: ReactElement;
  style?: object;
}

export const Layout: FC<LayoutProps> = ({
  children,
  sidebarComponent,
  style = {},
}) => {
  return (
    <>
      <Navbar />
      <main className={clsx(styles["Layout-Container"])}>
        {sidebarComponent}
        <div
          style={style}
          className={clsx(
            styles["Layout-Content"],
            !sidebarComponent && styles["Layout-Content_FullWith"]
          )}
        >
          {children}
        </div>
      </main>
    </>
  );
};
