import clsx from "clsx";
import { FC, ReactElement } from "react";

import Navbar from "src/components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Layout.module.css";
import TopDropdown from "../TopDropdown";

interface LayoutProps {
    children: ReactElement | ReactElement[];
    sidebarComponent?: ReactElement;
    style?: object;
    TopDropdownComponent?: any;
    TopDropdownComponentWrapper?: any;
    TopDropdownButtonName?: string;
}

export const DashboardLayout: FC<LayoutProps> = ({
    children,
    sidebarComponent,
    style = {},
    TopDropdownComponent,
    TopDropdownComponentWrapper,
    TopDropdownButtonName,
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
                    <TopDropdown
                        Child={TopDropdownComponent}
                        Wrapper={TopDropdownComponentWrapper}
                        TopDropdownButtonName={TopDropdownButtonName}
                    />

                    {children}
                </div>
            </main>
        </>
    );
};
