import { DashboardLayout } from "src/components/Dashboard/Layout/Layout";
import TopMenuContent from "src/components/Dashboard/Partner/Account/Profile";
import TopMenuContentWrapper from "src/components/Dashboard/Partner/Account/Profile/Wrapper";
import Menu from "src/components/Dashboard/Partner/Account/Menu";
import { CompanyAdd } from "types/companyInfoTypes";
import { GET, POST, PUT } from "src/lib/common/api";
import { GetServerSideProps } from "next";
import Filters from "src/components/Dashboard/Partner/Account/User/Filters";
import { useCallback, useEffect, useState } from "react";
import { postFilters } from "types/queryParameters";
import {
    getFiltersFromUrl,
    getUrlForListPage,
    setUrlForListPage,
} from "src/utils/url";
import { fetchUsersForSpecificRoleSuccess } from "src/lib/users/action";
import { fetchCountriesSuccess } from "src/lib/company/action";
import { useDispatch } from "react-redux";
import Table from "src/components/Dashboard/Partner/Account/User/Table";
import useSWR from "swr";
import Context from "src/components/UserTable/TableContext";

interface IProps {
    company: CompanyAdd;
    filters: any;
    // partners: any;
    countries: any;
}

export default function Profile({
    company: companyData,
    filters,
    // partners,
    countries,
}: IProps) {
    const dispatch = useDispatch();
    const company = { ...companyData, logo: companyData.logoId.liveURL };
    const [filterParameters, setFilterParameters] = useState(
        filters.postFilters
    );
    const { data, error, mutate } = useSWR(getKey(filterParameters), GET);

    // useEffect(() => {
    //     dispatch(fetchCountriesSuccess(countries));
    // }, []);

    // useEffect(() => {
    //     if (data?.users) {
    //         dispatch(fetchUsersForSpecificRoleSuccess(data));
    //     }
    // }, [data]);

    const handleChange = (prop: string, itemId: string) => {
        setFilterParameters((value: postFilters) => {
            value[prop] = itemId;
            return { ...value };
        });
    };

    useEffect(() => {
        filterToUrl();
    }, [filterParameters]);

    function filterToUrl() {
        setUrlForListPage({} as any, filterParameters, {});
    }

    const team = {
        name: "USER",
        users: data?.users,
    };

    const getItems = () => {
        mutate();
    };

    const createUpdateItem = useCallback((item: any, id: any) => {
        if (id) {
            PUT(`/user/${id}`, item);
        } else {
            POST("/user/register", item);
        }
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
                    <Context.Provider
                        value={{
                            countries,
                        }}
                    >
                        <Table
                            team={team}
                            getItems={getItems}
                            createUpdateItem={createUpdateItem}
                        />
                    </Context.Provider>
                </div>
            </div>
        </DashboardLayout>
    );
}

const getKey = (filterParameters: postFilters) => {
    let query = "";
    Object.entries(filterParameters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query += `&${key}=${value}`;
        }
    });
    query = query ? "?" + query.slice(1) : "";
    return `/user/filterByParams${query}`;
};

export const getServerSideProps: GetServerSideProps = async ({
    req,
    resolvedUrl,
}) => {
    const props: any = {};
    try {
        const filters = getFiltersFromUrl(resolvedUrl.split("?")[1] ?? "");
        // const queryString = getUrlForListPage(
        //     filters.pageFilters,
        //     filters.postFilters,
        //     filters.sort
        // );
        const user = JSON.parse(req.cookies.user) as any;
        const urls = [
            `/company/${user.companyId}`,
            // `/user/filterByParams${queryString}`,
            "/company/list/countries",
        ];
        const [company, countries] = await Promise.all([
            ...urls.map((url) => GET(url, req.cookies)),
        ]);
        props.company = company.company;
        // props.partners = partners;
        props.countries = countries;
        props.filters = filters;
    } catch (error) {
        console.log(error);
    }
    return {
        props,
    };
};
