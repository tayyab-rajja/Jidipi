import { DashboardLayout } from "src/components/Dashboard/Layout/Layout";
import TopMenuContent from "src/components/Dashboard/Partner/Account/Profile";
import TopMenuContentWrapper from "src/components/Dashboard/Partner/Account/Profile/Wrapper";
import Menu from "src/components/Dashboard/Partner/Account/Menu";
import { CompanyAdd } from "types/companyInfoTypes";
import { GET } from "src/lib/common/api";
import { GetServerSideProps } from "next";

interface IProps {
    company: CompanyAdd;
}

export default function Profile({ company: companyData }: IProps) {
    const company = { ...companyData, logo: companyData.logoId.liveURL };
    return (
        <DashboardLayout
            TopDropdownComponent={<TopMenuContent company={company} />}
            TopDropdownComponentWrapper={TopMenuContentWrapper}
            TopDropdownButtonName={"PROFILE"}
            tab={<Menu />}
        >
            <div></div>
        </DashboardLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const props: any = {};
    try {
        const user = JSON.parse(req.cookies.user) as any;
        const urls = [`/company/${user.companyId}`];
        const [company] = await Promise.all([
            ...urls.map((url) => GET(url, req.cookies)),
        ]);
        props.company = company.company;
    } catch (error) {
        console.log(error);
    }
    return {
        props,
    };
};
