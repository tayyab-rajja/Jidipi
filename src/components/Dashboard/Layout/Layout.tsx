import clsx from "clsx";
import { FC, ReactElement } from "react";

import Navbar from "src/components/Navbar";
import 'bootstrap/dist/css/bootstrap.css'
import styles from "./Layout.module.css";


interface LayoutProps {
  children: ReactElement | ReactElement[];
  sidebarComponent?: ReactElement;
  style?: object;
}

export const DashboardLayout: FC<LayoutProps> = ({
  children,
  sidebarComponent,
  style = {},
}) => {
  return (
    <>
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
