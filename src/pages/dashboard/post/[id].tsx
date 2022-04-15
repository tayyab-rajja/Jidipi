import {getPostCategories} from "../../../../helpers/changePostsData";
import {GetServerSideProps, GetStaticProps} from "next";
import {GET, POST, PUT} from "../../../lib/common/api";
import {ActivityStatus, CoverStatus, MessageStatus, PostStatus} from "../../../lib/models/post";
import useSWR from "swr";
import {isJudge, isPartner} from "../../../lib/user/role";
import {useContext, useEffect, useState} from "react";
import {makeSelectBasicUser} from "../../../lib/user/selector";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import Layout from "../../../components/Layout";
import Sidebar from "../../../components/Sidebar";
import SidebarWithAvatar from "../../../components/SidebarWithAvatar/SidebarWithAvatar";
import {json} from "stream/consumers";
import {getAppCookies} from "../../../lib/common/cookie";
import {UserContext} from "../../../providers/UserProvider";
import {useAuth} from "../../../providers/AuthProvider";

const basicUserSelector = makeSelectBasicUser();
export default function Post(props: any) {
    const userContext:any  = useContext(UserContext);
    console.log('userContext', userContext);
    const postId = props.id;
    console.log('postId', postId);

    // const user = useSelector(basicUserSelector);
    const user = userContext.user;
    const {data, error} = useSWR('/post/public/id/' + postId, GET);
    const post = data;
    // If load the competition bind to this post.
    // Or, and this post published last year
    const [competition, setCompetition] = useState<any | undefined>(undefined);
    // Awards under current competition and current page folder.
    const [awards, setAwards] = useState<any | []>([]);
    // page folder of this post.
    const [currentPageFolder, setCurrentPageFolder] = useState<any>(undefined);


    // const [award, setAward] = useState<any | undefined>(undefined);

    useEffect(() => {
        if (!user || !post) {
            return;
        }
        // page folder of this post.
        const currentPageFolder = props.pageFolders.find((page: any) => page._id === post.pageFolderId) ?? null;
        setCurrentPageFolder(currentPageFolder);
        if (isJudge(user) || isPartner(user)) {
            // If load the competition bind to this post.
            // Or, and this post published last year
            let competition = props.competitions.find((c: any) => c._id === post.competitionId);
            if (!competition && new Date(post.publishedDate).getFullYear() === new Date().getFullYear() - 1) {
                competition = props.competitions.find((competition: any) => post.publishedDate >= competition.postPublishedStartDate && post.publishedDate <= competition.postPublishedEndDate);
            }
            if (competition) {
                setCompetition(competition);
                // Awards under current competition and current page folder.
                const o = competition.awards.find((order: any) => order.pageFolderId === post.pageFolderId);
                setAwards(o.awards);
            }


            if (isPartner(user) && post.awardId) {
                // If partner, load the application data from post.
                const application = {
                    postId,
                    competitionId: post.competitionId,
                    awardId: post.awardId,
                    applicationReason: post.applicationReason,
                    status: post.competitionId ? PostStatus.Published : PostStatus.Draft,
                }
                SetApplication(application);
            }

        }

    }, [user, post]);

    // Partner applicate
    const [application, SetApplication] = useState({postId, competitionId: '', awardId: '', applicationReason: '', status: ''});

    async function apply(status: string) {
        const a = {...application, competitionId: status===PostStatus.Draft?'':competition._id, status}
        SetApplication(a);
        try{
            // show a notification UI. notify when success or fail
          const result =   await  PUT('/competition/apply', a);
          console.log(result);
        }catch (e) {

        }
    }


    const [evaluation, SetEvaluation] = useState({rating: 0, comment: ''});


    if (error) return <div>Post not found</div>;
    if (!data) return <div>Loading</div>;

    // return  <Layout
    //     // SidebarComponent={<Sidebar sidebarCategories={sidebarCategories} />}
    //     pageFolders={props.pageFolders}
    //     SidebarComponent={<SidebarWithAvatar />} >
    //
    // </Layout>;
    return (  <div>
            <div >
                <h2>Left sidebar</h2>
                {competition &&
                    <div>
                        <h3>{competition.title}</h3>
                        <p>{competition.competitionStartDate}</p>
                        <p>{competition.competitionEndDate}</p>
                        <p>Display the comment|rating from judge etc.</p>
                    </div>
                }

                <h2>POST</h2>
                {data.title}
                {data.publishedDate}
            </div>
            <div>
                <h2>Right sidebar</h2>
                <div>
                    <h2>Applicant</h2>
                    {awards.map((award: any) => (
                            <React.Fragment key={award._id}>
                                <button
                                    onClick={() => {
                                        SetApplication({...application, awardId: award._id})
                                    }}
                                    className={`nav-link  ${
                                        award._id === application.awardId ? 'active' : ''
                                    }`}
                                >{award.title}{award._id === application.awardId?'(*)':''}</button>
                            </React.Fragment>
                        )
                    )
                        // competition.awards
                    }
                    <textarea
                        value={application.applicationReason}
                        onChange={(e) => {
                            if (e.target.value) SetApplication({...application, applicationReason: e.target.value});
                        }}/>
                    <button
                        onClick={() => {
                            apply(PostStatus.Published)
                        }}
                    >Send Application to Competition
                    </button>
                    {!application.competitionId && <button
                        onClick={() => {
                            apply(PostStatus.Draft)
                        }}
                    >Save Draft
                    </button>
                    }


                </div>
                <div>CHAT HERE</div>

            </div>
        </div>
    );
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
        const pages = await GET('/pages');
        const pageFolders = pages && pages.pageFolders;
        const c = await GET('/competition');
        // Filters for partners
        const languages: any[] = [];
        const status = ActivityStatus;
        const message = MessageStatus;


        props = {PostStatus, MessageStatus, CoverStatus, competitions: c.competitions, pageFolders, id};
    } catch (e) {

    }
    // console.log('cookie', getAppCookies(context.req));


    // Filter for staffs
    // editor,manager, image(CoverStatus)
    return {
        props: props,
    };
}
