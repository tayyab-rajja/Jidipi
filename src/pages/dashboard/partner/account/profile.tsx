import { useContext } from "react";
import { DashboardLayout } from "src/components/Dashboard/Layout/Layout";
import SidebarDashboard from "src/components/Dashboard/Sidebar/SidebarDashboard";
import { generateSidebarMenus } from "src/lib/common/menu";
import { UserContext } from "src/providers/UserProvider";

interface IProps {}

export default function Profile({}: IProps) {
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    const menus = generateSidebarMenus({
        user,
    });
    return (
        <DashboardLayout sidebarComponent={<SidebarDashboard menus={menus} />}>
            <div>hello</div>
        </DashboardLayout>
    );
}
