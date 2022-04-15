import React, {useEffect, useState} from 'react';
import {isJudge, isPartner, isReader, isStaff} from "../../lib/user/role";
import {PostStatus} from "../../lib/models/post";
import {inspect} from "util";
import styles from "./SidebarDashboardRight.module.css";
import {PUT} from "../../lib/common/api";

/**
 * @param props
 * @constructor
 * props.competition  from post/[id].tsx  post the competition
 * props.user  from post/[id].tsx  post the user
 * props.menus if without competition and user, use the preset menus to render the layout.
 *
 */
const SidebarDashboardRight = (props: any) => {
    const {competition, user, post,  awards} = props;

    //the award that is currently being binded to the post.
    const award = awards.find((award: any) => award._id === post.awardId);



    // get awards of the competition
    // Awards under current competition and current page folder.
    useEffect(() => {
        if (!user || !post || !competition) {
            return;
        }
        if (isPartner(user)  ) {
            // If partner, load the application data from post.
            console.log(competition,competition._id);
            const application = {
                postId: post._id,
                competitionId: competition._id,
                awardId: post.awardId,
                applicationReason: post.applicationReason,
                status: post.competitionId ? PostStatus.Published : PostStatus.Draft,
            }
            SetApplication(application);
        }
        if (isJudge(user) ) {
            SetEvaluation({    competitionId: post.competitionId, postId:post._id, rating: post.rating, comment:  post.comment})
        }
    }, [user, post,competition]);

    // Partner application
    const [application, SetApplication] = useState({
        postId:'',
        competitionId: null,
        awardId: '',
        applicationReason: '',
        status: ''
    });

    async function apply(status: string) {
        const a = {...application,  status}
        console.log(a);
        SetApplication(a);
        try {
            // show a notification UI. notify when success or fail
            const result = await PUT('/competition/apply', a);
            console.log(result);
        } catch (e) {

        }
    }

    // EOF Partner application

    // Judge evaluation
    const [evaluation, SetEvaluation] = useState({competitionId:'', postId:'', rating: 0, comment: ''});

    async function review() {
        const result = await PUT('/competition/judge', evaluation);
        console.log('follow action for success for failed', result);
    }

    async function rating(rating: number) {
        const e = {...evaluation, rating};
        SetEvaluation(e);
        const result = await PUT('/competition/judge', e);
        console.log('follow action for success for failed', result);
    }

    // EOF Judge evaluation

    if (isJudge(user)) {
        return <div className={styles['Sidebar']}>
            <h2>Judge evaluation</h2>
            <p> Competition: {competition && competition.title}</p>
            <p> Award: {award && award.title}</p>
            <p> Reason: {post && post.applicationReason}</p>


            <div>
            <textarea
                value={evaluation.comment}
                onChange={(e) => {
                    if (e.target.value) SetEvaluation({...evaluation, comment: e.target.value});

                }}/>
                <p></p>
                {Array.from(Array(10).keys()).map(k => (
                    <React.Fragment key={k}>
                        <button
                            onClick={() => {
                                rating(k);
                            }}
                            className={`nav-link  ${
                                evaluation.rating === k ? 'active' : ''
                            }`}
                        >{k}{evaluation.rating === k ? '(*)' : ''}</button>
                    </React.Fragment>
                ))}
                <p></p>            <p></p>
                <button
                    onClick={() => {
                        review();
                    }}
                >Save ....
                </button>
            </div>
        </div>
    }
    if (isPartner(user)) {
        return <div className={styles['Sidebar']}>
            <h2>Partner Application</h2>
            <p></p>
            {awards.map((award: any) => (
                    <React.Fragment key={award._id}>
                        <p></p>
                        <button
                            onClick={() => {
                                SetApplication({...application, awardId: award._id})
                            }}
                            className={`nav-link  ${
                                award._id === application.awardId ? 'active' : ''
                            }`}
                        >{award.title}{award._id === application.awardId ? '(*)' : ''}</button>
                    </React.Fragment>
                )
            )
                // competition.awards
            }
            <p></p>
            <textarea
                value={application.applicationReason}
                onChange={(e) => {
                    if (e.target.value) SetApplication({...application, applicationReason: e.target.value});
                }}/>
            <p></p>
            <button
                onClick={() => {
                    apply(PostStatus.Published)
                }}
            >Send Application to Competition
            </button>
            <p></p>
            { application.status!==PostStatus.Published && <button
                onClick={() => {
                    apply(PostStatus.Draft)
                }}
            >Save Draft
            </button>
            }
            <p></p>
            <div>CHAT HERE</div>
        </div>
    }
    return <></>;
}

export default SidebarDashboardRight;