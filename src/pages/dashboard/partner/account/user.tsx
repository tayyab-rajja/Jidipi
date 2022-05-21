import { DashboardLayout } from "src/components/Dashboard/Layout/Layout";
import TopMenuContent from "src/components/Dashboard/Partner/Account/Profile";
import TopMenuContentWrapper from "src/components/Dashboard/Partner/Account/Profile/Wrapper";
import Menu from "src/components/Dashboard/Partner/Account/Menu";
import { CompanyAdd } from "types/companyInfoTypes";
import { GET } from "src/lib/common/api";
import { GetServerSideProps } from "next";
import Filters from "src/components/Dashboard/Partner/Account/User/Filters";
import { useState } from "react";
import { postFilters } from "types/queryParameters";

interface IProps {
    company: CompanyAdd;
    filters: any;
}

export default function Profile({ company: companyData, filters }: IProps) {
    const company = { ...companyData, logo: companyData.logoId.liveURL };
    const [filterParameters, setFilterParameters] = useState(
        filters.postFilters
    );

    const handleChange = (prop: string, itemId: string) => {
        setFilterParameters((value: postFilters) => {
            value[prop] = itemId;
            return { ...value };
        });
    };
    return (
        <DashboardLayout
            TopDropdownComponent={<TopMenuContent company={company} />}
            TopDropdownComponentWrapper={TopMenuContentWrapper}
            TopDropdownButtonName={"PROFILE"}
            tab={<Menu />}
        >
            <div className="bg-white">
                <div>
                    <Filters
                        handleChange={handleChange}
                        filterParameters={filterParameters}
                    />
                </div>
            </div>
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
        props.filters = {
            postFilters: {}
        }
    } catch (error) {
        console.log(error);
    }
    return {
        props,
    };
};
