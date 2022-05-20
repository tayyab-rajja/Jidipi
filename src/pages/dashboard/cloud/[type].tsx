 import {GetServerSideProps, PreviewData} from "next";
import React, {useContext} from "react";
import {UserContext} from "../../../providers/UserProvider";
import {isPartner, isStaff} from "../../../lib/user/role";
 import {DashboardLayout} from "../../../components/Dashboard/Layout/Layout";
import CloudContent from "src/components/Dashboard/CloudContent/CloudContent";

export default function Cloud(props: any) {
    // Currnet user, should limit to parnter and staff
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    if (!isPartner(user) || !isStaff(user)) {
        // Not partner, return deny
    }


    return <DashboardLayout>
        <div>
            {/* <div>Cloud content, Please force on content area, other coders will coding on the sidebar etc.</div> */}
            <CloudContent/>
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