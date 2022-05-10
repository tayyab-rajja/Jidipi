 import {GetServerSideProps, PreviewData} from "next";
import React, {useContext} from "react";
import {generateSidebarMenus} from "../../../lib/common/menu";
import {UserContext} from "../../../providers/UserProvider";
import Layout from 'src/components/Layout';
import SidebarDashboard from "../../../components/Dashboard/Sidebar/SidebarDashboard";
import {GET} from "../../../lib/common/api";
import {isPartner, isStaff} from "../../../lib/user/role";
 import {DashboardLayout} from "../../../components/Dashboard/Layout/Layout";

export default function Cloud(props: any) {
    // Currnet user, should limit to parnter and staff
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    if (!isPartner(user) || !isStaff(user)) {
        // Not partner, return deny
    }
    // MENU of the sidebar
    const menus = generateSidebarMenus({user})
    console.log(menus)


    return <DashboardLayout  sidebarComponent={<SidebarDashboard menus={menus}/>}>
        <div>
            <div>Cloud content, Please force on content area, other coders will coding on the sidebar etc.</div>

        </div>

    </DashboardLayout>;

};


/**
 * Get server side props
 * Load require data from API.
 * @param context
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    let props = {};
    try {
        props = {query: context.query};
    } catch (e) {

    }

    // Filter for staffs
    // editor,manager, image(CoverStatus)
    return {
        props: props,
    };
}