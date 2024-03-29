import clsx from "clsx";
import React, { FC, ReactElement } from "react";
import { Header } from "./Header/Header";
import TopDropdown from "../TopDropdown";
import styles from "./Layout.module.scss";
import { Sidebar } from "./Sidebar/Sidebar";

interface LayoutProps {
    children: ReactElement | ReactElement[];
    sidebarComponent?: ReactElement;
    rightSidebarComponent?: ReactElement;
    tab?: ReactElement;

    style?: object;
    TopDropdownComponent?: any;
    TopDropdownComponentWrapper?: any;
    TopDropdownButtonName?: string;

    competition?: any;
    user?: any;
    post?: any;
    awards?: any;
    test?: any;
    paddingTop?: boolean;
}

/**
 *  DashboardLayout For Dashboard
 * @param children - children of the layout
 * @param sidebarComponent - optional If not setup, will output the default sidebar component
 * @param rightSidebarComponent - optional If not setup, will output childrend in content area full width
 * @param tab - optional, For example, the post list table has a page folder tabs like "architects","interiors"
 * @param paddingTop - optional, if true, will add padding top 20px to the layout, for example, post detail page need it, post list page need no padding.
 * @param TopDropdownComponent
 * @param TopDropdownComponentWrapper
 * @param style
 * @param competition
 * @param user
 * @param post
 * @param awards
 * @param test
 * @constructor
 */
export const DashboardLayout: FC<LayoutProps> = ({
    children,
    sidebarComponent,
    style = {},
    TopDropdownComponent,
    TopDropdownComponentWrapper,
    TopDropdownButtonName,
    tab,
    rightSidebarComponent,
    competition,
    user,
    post,
    awards,
    test,
    paddingTop,
}) => {
    return (
        <div className="d-flex align-items-start flex-column vh-100">
            <Header user={user} />
            <div className="wrapper">
                <Sidebar>{sidebarComponent}</Sidebar>
                <div
                    className={`content-block ${paddingTop ? "pt-20" : ""}`}
                >
                    <div className="d-flex h-100">
                        <div className="min-w-0 flex-grow">
                            {TopDropdownComponent && (
                                <TopDropdown
                                    Child={TopDropdownComponent}
                                    Wrapper={TopDropdownComponentWrapper}
                                    TopDropdownButtonName={
                                        TopDropdownButtonName
                                    }
                                />
                            )}
                            {tab && tab}
                            <div className="content-wrapper">{children}</div>
                        </div>

                        {rightSidebarComponent ? (
                            <div       className={`${styles["navbar"]}  ${styles["right"]}`}>
                                {rightSidebarComponent}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
