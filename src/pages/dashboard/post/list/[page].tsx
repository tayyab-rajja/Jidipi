import styles from '../post.module.scss';
import {GetServerSideProps, PreviewData} from "next";
import {GET} from "../../../../lib/common/api";
import useSWR from "swr";
import {useRouter} from "next/router";
import {FilterItem} from "../../../../lib/models/filter";
import Layout from "../../../../components/Layout";
import React, {useContext} from "react";
import SidebarDashboard from "../../../../components/Dashboard/Sidebar/SidebarDashboard";
import {UserContext} from "../../../../providers/UserProvider";
import {isJudge, isPartner} from "../../../../lib/user/role";
import Link from 'next/link';
import {generateSidebarMenus} from "../../../../lib/common/menu";
import {DashboardLayout} from "../../../../components/Dashboard/Layout/Layout";

export default function Posts(props: any) {

    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    const router = useRouter();
    const {data, error} = useSWR(getKey(props), GET);
    if (error) return <div>error...</div>;
    if (!data) return <div>loading...</div>;
    console.log({user,competitions:props.competitions});

    // MENU of the sidebar
    const menus = generateSidebarMenus({user,competitions:props.competitions})



    //FILTER of the post list
    let filters: { [key: string]: FilterItem[] } = {};
    // PostStatus, MessageStatus, CoverStatus,
    // Filters for judge
    if (isJudge(user))
        filters = {
            award: [
                {label: 'abc', count: 1},
            ],
            score: [
                {label: 'No Score', min: 0, max: 0,},
                {label: 'Average Score 1-2', min: 1, max: 2,},
                {label: 'Average Score 2-3', min: 2, max: 3,},
                {label: 'Average Score 3-4', min: 3, max: 4,},
                {label: 'Average Score 4-5', min: 4, max: 5,},
                {label: 'Average Score 5-6', min: 5, max: 6,},
                {label: 'Average Score 6-7', min: 6, max: 7,},
                {label: 'Average Score 7-8', min: 7, max: 8,},
                {label: 'Average Score 8-9', min: 8, max: 9,},
                {label: 'Average Score 9-10', min: 9, max: 10,},
            ],
            comment: [],
        }
    //EOF FILTER of the post list
    const gotoPost = (id: string) => {
        router.push('/dashboard/post/' + id).then(() => {
        });
    }

    return <DashboardLayout   sidebarComponent={
        <SidebarDashboard menus={menus}/>}>
        <div>
            <div>TOP header</div>
            <div>FILTERS here</div>
            <div>-----------------POST list</div>
            {data.posts && data.posts.map((post: any) => (
                <div key={post._id} className={styles.post}>
                    <Link href={'/dashboard/post/' + post._id}>
                        <div className={styles.post_title_text}>
                            <h2>{post.title}</h2>
                            <span>{post.publishedDate}</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>

    </DashboardLayout>;

};

/**
 * Generate key for swr
 * @param props
 */
const getKey = (props: any,) => {
    let query;
    if (props.query) {
        delete props.query.page;
        query = Object.keys(props.query).map(key => key + '=' + props.query[key]).join('&');
    }
    query = query ? '?' + query : '';
    return `/post/${props.currentPageFolder._id}/filterByPage${query}`;
}

/**
 * Get server side props
 * Load require data from API.
 * @param context
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    //TODO check if user is logged in
    let props = {};
    try {
        // TODO combine the request into one call, or cache in redis...
        const pages = await GET('/pages');
        const pageFolders = pages && pages.pageFolders;
        const c = await GET('/competition');
        const currentPageFolder = pageFolders.find((page: any) => context.params && page.subDomain === context.params.page);
        props = {competitions: c.competitions, pageFolders, currentPageFolder, query: context.query};
    } catch (e) {

    }

    // Filter for staffs
    // editor,manager, image(CoverStatus)
    return {
        props: props,
    };
}