import { DashboardLayout } from "src/components/Dashboard/Layout/Layout";
import TopMenuContent from "src/components/Dashboard/Partner/Account/Profile";
import TopMenuContentWrapper from "src/components/Dashboard/Partner/Account/Profile/Wrapper";
import Menu from "src/components/Dashboard/Partner/Account/Menu";
import { CompanyAdd } from "types/companyInfoTypes";
import { GET } from "src/lib/common/api";
import { GetServerSideProps } from "next";
import Filters from "src/components/Dashboard/Partner/Account/User/Filters";
import { useCallback, useEffect, useState } from "react";
import { postFilters } from "types/queryParameters";
import { getFiltersFromUrl, getUrlForListPage } from "src/utils/url";
import { fetchUsersForSpecificRoleSuccess } from "src/lib/users/action";
import { fetchCountriesSuccess } from 'src/lib/company/actions'
import { useDispatch } from "react-redux";
import Table from "src/components/Dashboard/Partner/Account/User/Table";

interface IProps {
    company: CompanyAdd;
    filters: any;
    partners: any;
    countries: any;
}

export default function Profile({
    company: companyData,
    filters,
    partners,
    countries
}: IProps) {
    const dispatch = useDispatch();
    const company = { ...companyData, logo: companyData.logoId.liveURL };
    const [filterParameters, setFilterParameters] = useState(
        filters.postFilters
    );

    useEffect(() => {
        dispatch(fetchUsersForSpecificRoleSuccess(partners));
        dispatch(fetchCountriesSuccess(countries))
    })

    const handleChange = (prop: string, itemId: string) => {
        setFilterParameters((value: postFilters) => {
            value[prop] = itemId;
            return { ...value };
        });
    };

    const team = {
        name: 'USER',
        users: partners.users,
    };

    const getItems = () => {}

    const createUpdateItem = useCallback((item: any, id: any) => {
        // dispatch(updateUser(item, id));
      }, []);
      
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
                <div>
                    <Table team={team} getItems={getItems} createUpdateItem={createUpdateItem} />
                </div>
            </div>
        </DashboardLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    req,
    resolvedUrl,
}) => {
    const props: any = {};
    try {
        const filters = getFiltersFromUrl(resolvedUrl.split("?")[1] ?? "");
        filters.pageFilters = filters.pageFilters ?? {
            pageSize: 20,
            pageNumber: -1,
        };
        filters.sort = filters.sort.field
            ? filters.sort
            : {
                  field: "createdAt",
                  order: 1,
              };
        const queryString = getUrlForListPage(
            filters.pageFilters,
            filters.postFilters,
            filters.sort
        );
        const user = JSON.parse(req.cookies.user) as any;
        const urls = [
            `/company/${user.companyId}`,
            `/user/filterByParams${queryString}`,
            "/company/list/countries",
        ];
        const [company, partners, countries] = await Promise.all([
            ...urls.map((url) => GET(url, req.cookies)),
        ]);
        props.company = company.company;
        props.partners = partners;
        props.countries = countries;
        props.filters = {
            postFilters: {},
        };
    } catch (error) {
        console.log(error);
    }
    return {
        props,
    };
};
