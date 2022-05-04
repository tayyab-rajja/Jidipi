import styles from "../post.module.scss";
import { GetServerSideProps, PreviewData } from "next";
import { GET } from "../../../../lib/common/api";
import useSWR from "swr";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import SidebarDashboard from "../../../../components/Dashboard/Sidebar/SidebarDashboard";
import { UserContext } from "../../../../providers/UserProvider";
import { generateSidebarMenus } from "../../../../lib/common/menu";
import { DashboardLayout } from "../../../../components/Dashboard/Layout/Layout";
import Filters from "src/components/Dashboard/Judge/Architectures/Filters";
import Menu from "src/components/Dashboard/Judge/Architectures/Menu";
import { getFiltersFromUrl, setUrlForListPage } from "src/utils/url";
import { FilterItem } from "constant/filters/interface";
import {
    postFilters,
} from "types/queryParameters";

export default function Posts(props: any) {
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    const router = useRouter();
    const { data, error } = useSWR(getKey(props), GET);
    // const filters = getFiltersFromUrl(router.asPath.split("?")[1] ?? "");
    const [pageNumber, setPageNumber] = useState(-1);
    const [filterParameters, setFilterParameters] = useState(
        props.filters.postFilters
    );
    const [pageFilter, setPageFilter] = useState(
        props.filters.pageFilters ?? {
            pageSize: 20,
            pageNumber: -1,
        }
    );
    useEffect(() => {
        // filterToUrl();
    }, [filterParameters, pageFilter]);
    // const pageNumber = useSelector(state => state.user.pageNumberBack);
    // const total = useSelector(state => state.user.total);
    // const statuses = useSelector(state => state.user.statuses)
    // const fetchingUser = useSelector(state => state.user.fetchingUser);
    // MENU of the sidebar
    const menus = generateSidebarMenus({
        user,
        competitions: props.competitions,
    });

    function filterToUrl() {
        setUrlForListPage(pageFilter, filterParameters, {
            field: "",
            order: 1,
        });
        getItems();    }

    const getItems = () => {};

    useEffect(() => {
        // setUrlForListPage({ ...pageFilter, pageNumber }, filterParameters, {
        //     field: "",
        //     order: 1,
        // });
    }, [pageNumber]);

    const onChange = (filterParameters: any) =>
        setFilterParameters((value: any) => ({ ...value, ...filterParameters }));

    //   const size = Math.ceil(total / pageFilter.pageSize);
    const onPage = (page: any) => {
        setPageFilter((value: any) => ({ ...value, pageNumber: page }));
    };

    const onPageSizeChange = (size: any) => {
        setPageFilter((value: any) => ({ ...value, pageSize: size }));
    };
    const pageOptions = [
        { label: 20, value: 20 },
        { label: 100, value: 100 },
    ];

    const handleChange = (prop: string, item: FilterItem) => {
        setFilterParameters((value: postFilters) => {
            value[prop] = item?._id
            return { ...value };
        })
    }

    if (error) return <div>error...</div>;
    if (!data) return <div>loading...</div>;

    return (
        <DashboardLayout sidebarComponent={<SidebarDashboard menus={menus} />}>
            <div>
                <Menu menuFolders={props.menuFolders} />
                <div style={{ backgroundColor: "white" }}>
                    <Filters categories={props.categories} handleChange={handleChange} />
                    {/* <div>TOP header</div>
                    <div>FILTERS here</div>
                    <div>-----------------POST list</div>
                    {data.posts &&
                        data.posts.map((post: any) => (
                            <div key={post._id} className={styles.post}>
                                <Link href={"/dashboard/post/" + post._id}>
                                    <div className={styles.post_title_text}>
                                        <h2>{post.title}</h2>
                                        <span>{post.publishedDate}</span>
                                    </div>
                                </Link>
                            </div>
                        ))} */}
                </div>
            </div>
        </DashboardLayout>
    );
}

/**
 * Generate key for swr
 * @param props
 */
const getKey = (props: any) => {
    let query;
    // TODO compitionId should be dynamic
    const compitionId = "competitionId=61c9c6b8375d992bb47db5b2";
    if (props.query) {
        delete props.query.page;
        query = Object.keys(props.query)
            .map((key) => key + "=" + props.query[key])
            .join("&");
    }
    query = query ? `?${compitionId}&${query}` : "?" + compitionId;
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
    const filters = getFiltersFromUrl(context.resolvedUrl.split('?')[1] ?? "")
    try {
        // TODO combine the request into one call, or cache in redis...
        const [c, pages] = await Promise.all([
            GET("/competition"),
            GET("/pages"),
        ]);
        const pageFolders = pages && pages.pageFolders;
        const currentPageFolder = pageFolders.find(
            (page: any) => page.subDomain === "architectures"
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
            filters
        };
    } catch (e) {}

    // Filter for staffs
    // editor,manager, image(CoverStatus)
    return {
        props: props,
    };
};
