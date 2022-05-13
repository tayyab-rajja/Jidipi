import { useContext, useState } from "react";
import { DashboardLayout } from "src/components/Dashboard/Layout/Layout";
import SidebarDashboard from "src/components/Dashboard/Sidebar/SidebarDashboard";
import { generateSidebarMenus } from "src/lib/common/menu";
import { UserContext } from "src/providers/UserProvider";
import TopMenuContent from "src/components/Dashboard/Partner/Account/Profile";
import TopMenuContentWrapper from "src/components/Dashboard/Partner/Account/Profile/Wrapper";
import Menu from "src/components/Dashboard/Partner/Account/Menu";
import Form from "src/components/Dashboard/Partner/Account/Form";
import { CompanyAdd } from "types/companyInfoTypes";
import { GET } from "src/lib/common/api";
import { GetServerSideProps } from "next";

interface IProps {}

export default function Profile({}: IProps) {
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    const menus = generateSidebarMenus({
        user,
    });

    const [company, setCompany] = useState<CompanyAdd>({
        brandName: "",
        companyName: "",
        email: "",
        description: "",
        telephone: "",
        fax: "",
        label: "",
        group: [],
        avatar: "",
        profileUrl: "",
        partnerUrl: "",
        website: "",
        country: "",
        address: "",
        qrCode: "",
        qrLink: "",
        googleMapLink: "",
        facebookLink: "",
        twitterLink: "",
        instagramLink: "",
        pininterestLink: "",
        youtubeLink: "",
        vimeoLink: "",
        linkedLink: "",
        behancLink: "",
        status: "Draft",
        publishedDate: "",
        scheduledDate: "",
        isActive: true,
        _id: undefined,
        logoId: null,
    });

    const handleChange = (prop: string, value: string) => {
        setCompany((company: any) => {
            company[prop] = value;
            return { ...company };
        });
    };
    return (
        <DashboardLayout
            sidebarComponent={<SidebarDashboard menus={menus} />}
            TopDropdownComponent={<TopMenuContent />}
            TopDropdownComponentWrapper={TopMenuContentWrapper}
            TopDropdownButtonName={"PROFILE"}
        >
            <Menu />
            <Form handleChange={handleChange} company={company} />
        </DashboardLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const props: any = {};
    try {
        props.countries = await GET("/company/list/countries", req.cookies)
    } catch (error) {
        console.log(error);
    }
    return {
        props,
    };
};
