import styles from "../post.module.scss";
import { GetServerSideProps } from "next";
import { GET } from "../../../../lib/common/api";
import useSWR from "swr";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import { DashboardLayout } from "../../../../components/Dashboard/Layout/Layout";
import Filters from "src/components/Dashboard/Judge/Architectures/Filters";
import Menu from "src/components/Dashboard/Judge/Architectures/Menu";
import Table from "src/components/Dashboard/Judge/Architectures/Table";
import PageSize from "src/components/Dashboard/PageSize";
import PaginationReverse from "src/components/Dashboard/PaginationReverse";
import PaginationStyles from "src/components/Dashboard/PaginationReverse/PaginationReverse.module.scss";
import { getFiltersFromUrl, setUrlForListPage } from "src/utils/url";
import Process from "src/components/Dashboard/Process";
import ProcessWrapper from "src/components/Dashboard/Process/Wrapper";
import ICompetition from "types/competition";
import type { ParsedUrlQuery } from "querystring";
import {
    pageFilters,
    postFilters,
    queryParameters,
    sort,
} from "types/queryParameters";
import { PageFolder } from "types/pageFolderType";
import { FilterItem } from "constant/filters/interface";
import { isJudge } from "src/lib/user/role";

interface IProps {
    competitions: ICompetition[];
    currentPageFolder: PageFolder;
    query: ParsedUrlQuery;
    menuFolders: PageFolder[];
    categories: FilterItem[];
    filters: { pageFilters: pageFilters; postFilters: postFilters; sort: sort };
}

type award = {
    _id: string;
    title: string;
};

export default function Posts(props: IProps) {
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    const router = useRouter();
    let awards: award[] = [];

    // // MENU of the sidebar
    // const menus = generateSidebarMenus({
    //     user,
    //     competitions: props.competitions,
    // });
    //
    // console.log('menus', menus);

    if (props.competitions) {
        const competition = props.competitions.find(
            (c) => c.title === router.query.competitionId
        );
        awards = competition?.awards.find(
            (a) => a.pageFolderId === props.currentPageFolder._id
        )?.awards as award[];
    }

    // useEffect(() => {
    //     if (isJudge(user) && !router.query.competitionId && menus?.length) {
    //         let menu = menus[0];
    //         if (menu.links.length) {
    //             let link = menu.links[1];
    //             if (link) {
    //                 router.replace({
    //                     query: { ...router.query, competitionId: link.title }
    //                 })
    //             }
    //         }
    //     }
    // }, []);

    const [filterParameters, setFilterParameters] = useState(
        props.filters.postFilters
    );
    const [pageFilter, setPageFilter] = useState(
        props.filters.pageFilters ?? {
            pageSize: 20,
            pageNumber: -1,
        }
    );
    const [sort, setSort] = useState(
        props.filters.sort.field
            ? props.filters.sort
            : {
                  field: "createdAt",
                  order: 1,
              }
    );
    const { data, error } = useSWR(
        getKey(props, pageFilter, filterParameters, sort),
        GET
    );

    let pageNumber = -1;
    let total = 20;

    if (data) {
        pageNumber = data.pageNumberBack;
        total = data.total;
    }

    useEffect(() => {
        setFilterParameters((value: any) => {
            value.competitionId = router.query.competitionId;
            return { ...value };
        });
    }, [router.query.competitionId]);

    useEffect(() => {
        filterToUrl();
    }, [filterParameters, pageFilter]);


    function filterToUrl() {
        setUrlForListPage(pageFilter, filterParameters, {
            field: "",
            order: 1,
        });
    }

    const size = Math.ceil(total / pageFilter.pageSize);
    const onPage = (page: any) => {
        setPageFilter((value: any) => ({ ...value, pageNumber: page }));
    };

    const onPageSizeChange = (size: any) => {
        setPageFilter((value: any) => ({ ...value, pageSize: size }));
    };

    const handleChange = (prop: string, itemId: string) => {
        setFilterParameters((value: postFilters) => {
            value[prop] = itemId;
            return { ...value };
        });
    };

    const handleSizeChange = (field: string, order: 1 | -1) => {
        setSort({
            field,
            order,
        });
    };

    if (error) return <div>error...</div>;

    return (
        <DashboardLayout
            TopDropdownComponent={
                <Process
                    statuses={data?.statuses}
                    menuFolders={props.menuFolders}
                    competitionPageFolderIds={user?.competitionPageFolderIds}
                />
            }
            TopDropdownComponentWrapper={ProcessWrapper}
            TopDropdownButtonName={"PROCESS"}
            tab={        <Menu menuFolders={props.menuFolders} user={user} />}
        >
            <div className="bg-white">

                <div>
                    <Filters
                        categories={props.categories}
                        handleChange={handleChange}
                        filterParameters={filterParameters}
                        statuses={data && data.statuses}
                        awards={awards}
                    />
                    {!data ? (
                        <div>Loading</div>
                    ) : (
                        <div>
                            <Table
                                options={data.posts}
                                handleSizeChange={handleSizeChange}
                                sort={sort}
                            />
                            <div className={styles["wrapper"]}>
                                <div className="pb-3">
                                    <PageSize
                                        options={[20, 50]}
                                        onPageSizeChange={onPageSizeChange}
                                        pageSize={pageFilter.pageSize}
                                    />
                                </div>
                                <div
                                    className={`${PaginationStyles["top-pagination"]} text-center`}
                                >
                                    <PaginationReverse
                                        className="d-inline-flex p-0 mx-auto mb-0"
                                        size={size || 1}
                                        sequre
                                        page={pageNumber + 1}
                                        onChange={(e: any) => {
                                            onPage(e - 1);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

/**
 * Generate key for swr
 * @param props
 */
const getKey = (
    props: any,
    pageFilter: pageFilters,
    filterParameters: postFilters,
    sort: sort
) => {
    let query = "";
    // const router = useRouter()
    // TODO compitionId should be dynamic
    // const competitionId = `competitionId=${router.query.competitionId}`;
    const filters: queryParameters = {
        ...pageFilter,
        ...filterParameters,
        ...sort,
    };
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query += `&${key}=${value}`;
        }
    });
    // query = query ? `?${competitionId}${query}` : "?" + competitionId;
    query = query ? "?" + query.slice(1) : "";
    console.log(query);
    return `/post/${props.currentPageFolder._id}/filterByPage${query}`;
};

/**
 * Get server side props
 * Load require data from API.
 * @param context
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    //TODO check if user is logged in
    let props = {};
    const filters = getFiltersFromUrl(context.resolvedUrl.split("?")[1] ?? "");
    // console.log(filters);
    delete filters.postFilters.page;
    try {
        // TODO combine the request into one call, or cache in redis...
        const [c, pages] = await Promise.all([
            GET("/competition"),
            GET("/pages"),
        ]);
        const pageFolders = pages && pages.pageFolders;
        const currentPageFolder = pageFolders.find(
            (page: any) => page.subDomain === context.query.page
        );
        const categoriesResult = await GET(
            `/category/rootLevel/${currentPageFolder._id}/CATEGORIES`
        );
        const menuFolders = pageFolders.filter((page: any) => {
            return page.pageType === "PROJECT" || page.pageType === "PRODUCT";
        });
        props = {
            competitions: c.competitions,
            currentPageFolder,
            query: context.query,
            menuFolders,
            categories: categoriesResult.categories,
            filters,
        };
    } catch (e) {}

    // Filter for staffs
    // editor,manager, image(CoverStatus)
    return {
        props: props,
    };
};
