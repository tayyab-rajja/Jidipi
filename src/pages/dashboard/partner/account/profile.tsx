import { useContext } from "react";
import { DashboardLayout } from "src/components/Dashboard/Layout/Layout";
import { UserContext } from "src/providers/UserProvider";
import TopMenuContent from "src/components/Dashboard/Partner/Account/Profile";
import TopMenuContentWrapper from "src/components/Dashboard/Partner/Account/Profile/Wrapper";

interface IProps {}

export default function Profile({}: IProps) {
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    return (
        <DashboardLayout
            TopDropdownComponent={
                <TopMenuContent />
            }
            TopDropdownComponentWrapper={TopMenuContentWrapper}
            TopDropdownButtonName={"PROFILE"}
        >
            <div>hello</div>
        </DashboardLayout>
    );
}
