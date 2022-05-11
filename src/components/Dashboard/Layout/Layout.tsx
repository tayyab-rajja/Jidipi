import clsx from "clsx";
import React, {FC, ReactElement} from "react";
import {Header} from "./Header/Header";
import TopDropdown from "../TopDropdown";
import styles from "./Layout.module.css";
import {Sidebar} from "./Sidebar/Sidebar";


interface LayoutProps {
    children: ReactElement | ReactElement[];
    sidebarComponent?: ReactElement;
    rightSidebarComponent?: ReactElement;

    style?: object;
    TopDropdownComponent?: any;
    TopDropdownComponentWrapper?: any,
    TopDropdownButtonName?: string;

    competition?: any,
    user?: any,
    post?: any,
    awards?: any,
    test?: any,
}

/**
 *
 * @param children - children of the layout
 * @param sidebarComponent - optional If not setup, will output the default sidebar component
 * @param rightSidebarComponent - optional If not setup, will output childrend in content area full width
 * @param style
 * @param TopDropdownComponent
 * @param TopDropdownComponentWrapper
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
                                                     rightSidebarComponent,
                                                     competition,
                                                     user, post, awards, test,
                                                 }) => {
    return (
        <>

            <Header user={user}/>
            <div className="wrapper">
                {/*{sidebarComponent ? <div className="left-navbar"> {sidebarComponent}</div> : <Sidebar/>}*/}
                {sidebarComponent ? sidebarComponent : <Sidebar/>}
                <div className="content-block">
                    {TopDropdownComponent && <TopDropdown Child={TopDropdownComponent} Wrapper={TopDropdownComponentWrapper}/>}
                    {children}
                </div>
                {/*{rightSidebarComponent ? <div className="right-navbar"> {rightSidebarComponent}</div> : null}*/}

            </div>
        </>
    );
};
