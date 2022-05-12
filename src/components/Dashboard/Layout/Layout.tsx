import clsx from "clsx";
import React, {FC, ReactElement} from "react";
import {Header} from "./Header/Header";
import TopDropdown from "../TopDropdown";
import styles from "./Layout.module.scss";
import {Sidebar} from "./Sidebar/Sidebar";


interface LayoutProps {
    children: ReactElement | ReactElement[];
    sidebarComponent?: ReactElement;
    rightSidebarComponent?: ReactElement;
    tab?: ReactElement;

    style?: object;
    TopDropdownComponent?: any;
    TopDropdownComponentWrapper?: any,
    TopDropdownButtonName?: string;

    competition?: any,
    user?: any,
    post?: any,
    awards?: any,
    test?: any,
    paddingTop?: boolean;
}

/**
 *
 * @param children - children of the layout
 * @param sidebarComponent - optional If not setup, will output the default sidebar component
 * @param rightSidebarComponent - optional If not setup, will output childrend in content area full width
 * @param tab - optional, If setup which fixed above the table
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
                                                            tab,
                                                     rightSidebarComponent,
                                                     competition,
                                                     user, post, awards, test,
    paddingTop,
                                                 }) => {
    return (
        <div className="d-flex align-items-start flex-column vh-100">

            <Header user={user}/>
            <div className="wrapper">
                <Sidebar>
                    {sidebarComponent}
                </Sidebar>
                    <div className={`content-block    ${paddingTop?'pt-20':''}`}>
                    <div className="d-flex h-100" >
                        <div className="flex-grow">
                            {TopDropdownComponent && <TopDropdown Child={TopDropdownComponent} Wrapper={TopDropdownComponentWrapper}/>}
                            {tab &&tab}
                            <div className="content-wrapper">
                                {children}
                            </div>
                        </div>


                        {rightSidebarComponent ? <div className={styles['navbar']}> {rightSidebarComponent}</div> : null}
                    </div>

                </div>
            </div>
        </div>
    );
};
