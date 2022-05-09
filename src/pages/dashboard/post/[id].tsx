import { getPostCategories } from "../../../../helpers/changePostsData";
import { GetServerSideProps, GetStaticProps } from "next";
import { GET, POST, PUT } from "../../../lib/common/api";
import {
    ActivityStatus,
    CoverStatus,
    MessageStatus,
    PostStatus,
} from "../../../lib/models/post";
import useSWR from "swr";
import { isJudge, isPartner, isReader, isStaff } from "../../../lib/user/role";
import { useContext, useEffect, useState } from "react";
import { makeSelectBasicUser } from "../../../lib/user/selector";
import React from "react";
import { UserContext } from "../../../providers/UserProvider";
import Layout from "../../../components/Layout";
import SidebarDashboard from "../../../components/Dashboard/Sidebar/SidebarDashboard";
import SidebarDashboardRight from "../../../components/Dashboard/RightSidebar/SidebarDashboardRight";
import { DashboardLayout } from "../../../components/Dashboard/Layout/Layout";

export default function Post(props: any) {
    // get user from context
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    //  get post
    const postId = props.id;
    const { data, error } = useSWR("/post/public/id/" + postId, GET);
    const post = data;

    // get competition
    // If load the competition bind to this post.
    // Or, and this post published last year
    const [competition, setCompetition] = useState<any | undefined>(undefined);
    // get awards of the competition
    // Awards under current competition and current page folder.
    const [awards, setAwards] = useState<any | []>([]);
    useEffect(() => {
        if (!user || !post) {
            return;
        }
        if (isReader(user)) {
            return;
        } else if (isStaff(user)) {
        } else if (isJudge(user) || isPartner(user)) {
            // If load the competition bind to this post.
            // Or, and this post published last year
            let competition = props.competitions.find(
                (c: any) => c._id === post.competitionId
            );
            if (
                !competition &&
                new Date(post.publishedDate).getFullYear() ===
                    new Date().getFullYear() - 1
            ) {
                competition = props.competitions.find(
                    (competition: any) =>
                        post.publishedDate >=
                            competition.postPublishedStartDate &&
                        post.publishedDate <= competition.postPublishedEndDate
                );
            }

            if (competition) {
                setCompetition(competition);
                // Awards under current competition and current page folder.
                const o = competition.awards.find(
                    (order: any) => order.pageFolderId === post.pageFolderId
                );
                setAwards(o.awards);
            }
        }
    }, [user, post]);

    if (error) return <div>Post not found</div>; // TODO redirect to 404 page
    if (!data) return <div>Loading</div>;
    return             <SidebarDashboardRight user={user} post={post} awards={awards} competition={competition}/>;
    // return <DashboardLayout
    //     // pageFolders={props.pageFolders}
    //     sidebarComponent={<SidebarDashboard competition={competition} user={user} post={post} awards={awards}/>}>
    //     <div>
    //         <div>
    //             <SidebarDashboardRight user={user} post={post} awards={awards} competition={competition}/>
    //         </div>
    //         <div>
    //             <div dangerouslySetInnerHTML={{__html: post.description}}/>
    //         </div>
    //     </div>
    // </DashboardLayout>;

};

// export async function getStaticPaths() {
//     return {
//         paths: [{params: {id: 'id'}}],
//         fallback: true,
//     };
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context && context.query && context.query.id;
    //TODO check if user is logged in
    let props = {};
    try {
        const pages = await GET("/pages");
        const pageFolders = pages && pages.pageFolders;
        const c = await GET("/competition");
        // Filters for partners
        const languages: any[] = [];
        const status = ActivityStatus;
        const message = MessageStatus;

        props = {
            PostStatus,
            MessageStatus,
            CoverStatus,
            competitions: c.competitions,
            pageFolders,
            id,
        };
    } catch (e) {}
    return {
        props: props,
    };
};
