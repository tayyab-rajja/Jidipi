import clsx from "clsx";
import React, {FC, ReactElement} from "react";
import SidebarDashboard from "../Sidebar/SidebarDashboard";

import {Header} from "./Header/Header";
import SidebarDashboardRight from "../RightSidebar/SidebarDashboardRight";
import TopDropdown from "../TopDropdown";
import styles from "./Layout.module.css";


interface LayoutProps {
    children: ReactElement | ReactElement[];
    sidebarComponent?: ReactElement;
    style?: object;
    TopDropdownComponent?: any;
    TopDropdownComponentWrapper?: any,
    competition?: any,
    menus?: any,
    user?: any,
    post?: any,
    awards?: any,
    test?:any,
}

export const DashboardLayout: FC<LayoutProps> = ({
                                                     children,
                                                     sidebarComponent,
                                                     style = {},
                                                     TopDropdownComponent,
                                                     TopDropdownComponentWrapper,
                                                     menus,
                                                     competition,
                                                     user, post, awards,test,
                                                 }) => {
    if(test)
    return (
        <>
            <Header></Header>
            <section className="main-inner">
                <div className="container-fluid">
                    <div className="row">

                        <SidebarDashboard menus={menus} competition={competition} user={user} post={post}
                                          awards={awards}/>
                        <div className="col-lg middle-area pt-20">
                            <div className="middle-area-grid">
                                <div>
                                    <div dangerouslySetInnerHTML={{__html: post.description}}/>
                                </div>
                            </div>
                        </div>


                        <SidebarDashboardRight competition={competition} user={user} post={post} awards={awards}/>

                    </div>
                </div>
            </section>

        </>
    );
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
                    <TopDropdown Child={TopDropdownComponent} Wrapper={TopDropdownComponentWrapper} />

                    {children}
                </div>
            </main>
        </>
    );
};
